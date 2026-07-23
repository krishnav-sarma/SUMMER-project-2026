import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { api } from "../utils/api";
import DifficultyBadge from "../components/DifficultyBadge";
import LanguageSelector from "../components/LanguageSelector";
import Button from "../components/Button";
import ResultPanel from "../components/ResultPanel";
import HintsPanel from "../components/HintsPanel";
import EditorialPanel from "../components/EditorialPanel";
import DiscussionPanel from "../components/DiscussionPanel";
import ThemeSelector, { getSavedTheme } from "../components/ThemeSelector";
import { useUserStats } from "../context/UserStatsContext";
import { useAuth } from "../context/AuthContext";

export default function ProblemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { afterSubmit } = useUserStats();

  const [problem, setProblem] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState("javascript");
  const [editorTheme, setEditorTheme] = useState(getSavedTheme);
  const [code, setCode] = useState("");
  const [mobileTab, setMobileTab] = useState("description"); // description | editor | result
  const [subTab, setSubTab] = useState("description"); // description | hints | editorial | discuss
  const [status, setStatus] = useState("idle"); // idle | running | done
  const [result, setResult] = useState(null);
  const [runError, setRunError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    api
      .get(`/problems/${id}`)
      .then(({ problem }) => {
        if (cancelled) return;
        setProblem(problem);
        setCode(problem.starterCode?.javascript || "");
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || "Couldn't load this problem.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-lg2 py-section text-center">
        <p className="font-body text-body-sm text-ink-muted">Loading problem…</p>
      </div>
    );
  }

  if (loadError || !problem) {
    return (
      <div className="max-w-[1200px] mx-auto px-lg2 py-section text-center">
        <h1 className="font-display text-display-md text-ink mb-xs2">
          {loadError ? "Couldn't load this problem" : "Problem not found"}
        </h1>
        {loadError && <p className="font-body text-body-sm text-ink-muted mb-md2">{loadError}</p>}
        <Link to="/problems" className="font-body text-body-sm text-accent-blue">
          ← Back to problems
        </Link>
      </div>
    );
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(problem.starterCode?.[lang] || "");
  };

  const handleRun = async (isSubmit) => {
    if (!user) {
      setRunError("Sign in to run or submit code.");
      return;
    }
    setStatus("running");
    setRunError("");
    setMobileTab("result");

    try {
      const path = isSubmit ? "/submissions/submit" : "/submissions/run";
      const raw = await api.post(path, { problemId: problem._id, language, code });

      // /submissions/submit returns { submission, newlySolved, userStats } while
      // /submissions/run returns { results, allPassed, runtimeMs, memoryKb } directly —
      // normalize both into the flat shape ResultPanel expects.
      const res = isSubmit
        ? {
            results: raw.submission.testResults,
            allPassed: raw.submission.passed,
            runtimeMs: raw.submission.runtimeMs,
            memoryKb: raw.submission.memoryKb,
          }
        : raw;

      setResult(res);
      setStatus("done");

      if (isSubmit) {
        await afterSubmit();
      }
    } catch (err) {
      setStatus("done");
      setRunError(err.message || "Judge request failed — try again.");
    }
  };

  const subTabs = [
    { id: "description", label: "Description" },
    { id: "hints", label: "Hints" },
    { id: "editorial", label: "Editorial" },
    { id: "discuss", label: "Discuss" },
  ];

  const DescriptionBody = (
    <div className="p-md2 md:p-lg2">
      <div className="flex items-center gap-sm2 mb-xs2">
        <h1 className="font-display text-display-md text-ink">{problem.title}</h1>
      </div>
      <div className="flex items-center gap-md2 mb-lg2">
        <DifficultyBadge level={problem.difficulty} />
        <span className="font-body text-caption text-ink-muted">{problem.topic}</span>
        <span className="font-body text-caption text-ink-muted">
          {problem.acceptance ?? 0}% acceptance
        </span>
      </div>

      <p className="font-body text-body text-ink whitespace-pre-line mb-lg2">
        {problem.description}
      </p>

      {problem.examples?.map((ex, i) => (
        <div key={i} className="bg-surface-1 rounded-md p-sm2 mb-sm2">
          <p className="font-body text-caption text-ink-muted mb-xxs">Example {i + 1}</p>
          <p className="font-body text-body-sm text-ink">Input: {ex.input}</p>
          <p className="font-body text-body-sm text-ink">Output: {ex.output}</p>
          {ex.explanation && (
            <p className="font-body text-caption text-ink-muted mt-xxs">{ex.explanation}</p>
          )}
        </div>
      ))}

      {problem.constraints?.length > 0 && (
        <div className="mt-lg2">
          <p className="font-body text-caption text-ink-muted mb-xs2">Constraints</p>
          <ul className="list-disc list-inside">
            {problem.constraints.map((c, i) => (
              <li key={i} className="font-body text-body-sm text-ink-muted">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const LeftPane = (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-hairline shrink-0">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-md2 py-sm2 font-body text-body-sm ${
              subTab === tab.id ? "text-ink border-b-2 border-accent-blue" : "text-ink-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {subTab === "description" && DescriptionBody}
        {subTab === "hints" && <HintsPanel problemId={problem._id} hintCount={problem.hintCount} />}
        {subTab === "editorial" && (
          <EditorialPanel problemId={problem._id} editorial={problem.editorial} />
        )}
        {subTab === "discuss" && <DiscussionPanel problemId={problem._id} />}
      </div>
    </div>
  );

  const EditorPane = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-md2 py-sm2 border-b border-hairline flex-wrap gap-sm2">
        <div className="flex items-center gap-sm2 flex-wrap">
          <LanguageSelector value={language} onChange={handleLanguageChange} />
          <ThemeSelector value={editorTheme} onChange={setEditorTheme} />
        </div>
        <div className="flex items-center gap-sm2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRun(false)}
            disabled={status === "running"}
          >
            Run
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleRun(true)}
            disabled={status === "running"}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-[320px]">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          theme={editorTheme}
          value={code}
          onChange={(val) => setCode(val ?? "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );

  const resultWithError = runError ? { error: runError } : result;

  const ResultPane = (
    <div className="border-t border-hairline max-h-[280px] md:max-h-[320px] overflow-y-auto">
      <ResultPanel status={status} result={resultWithError} />
    </div>
  );

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Mobile tabs */}
      <div className="flex md:hidden border-b border-hairline">
        {[
          { id: "description", label: "Description" },
          { id: "editor", label: "Editor" },
          { id: "result", label: "Result" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`flex-1 py-sm2 font-body text-body-sm ${
              mobileTab === tab.id ? "text-ink border-b-2 border-accent-blue" : "text-ink-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile: single pane at a time */}
      <div className="flex-1 md:hidden overflow-hidden flex flex-col">
        {mobileTab === "description" && <div className="flex-1 overflow-hidden">{LeftPane}</div>}
        {mobileTab === "editor" && <div className="flex-1 overflow-hidden">{EditorPane}</div>}
        {mobileTab === "result" && (
          <div className="flex-1 overflow-y-auto">
            <ResultPanel status={status} result={resultWithError} />
          </div>
        )}
      </div>

      {/* Desktop: split pane */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-hairline overflow-hidden">{LeftPane}</div>
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">{EditorPane}</div>
          {ResultPane}
        </div>
      </div>
    </div>
  );
}
