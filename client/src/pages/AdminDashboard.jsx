import { useEffect, useState } from "react";
import { api } from "../utils/api";
import DifficultyBadge from "../components/DifficultyBadge";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const emptyForm = {
  title: "",
  difficulty: "Easy",
  topic: "",
  tags: "",
  companies: "",
  description: "",
  testCases: [{ input: "", expected: "" }],
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("problems"); // problems | users
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProblems = () => {
    setLoading(true);
    api
      .get("/problems?limit=500")
      .then(({ problems }) => setProblems(problems))
      .catch((err) => setError(err.message || "Couldn't load problems."))
      .finally(() => setLoading(false));
  };

  const loadUsers = () => {
    setLoading(true);
    api
      .get("/users")
      .then(({ users }) => setUsers(users))
      .catch((err) => setError(err.message || "Couldn't load users."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setError("");
    if (tab === "problems") loadProblems();
    else loadUsers();
  }, [tab]);

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setForm({
      title: p.title,
      difficulty: p.difficulty,
      topic: p.topic,
      tags: (p.tags || []).join(", "),
      companies: (p.companies || []).join(", "),
      description: p.description || "",
      testCases: p.testCases?.length ? p.testCases : [{ input: "", expected: "" }],
    });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const payload = {
      title: form.title,
      difficulty: form.difficulty,
      topic: form.topic,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      companies: form.companies.split(",").map((c) => c.trim()).filter(Boolean),
      description: form.description || "No description provided yet.",
      testCases: form.testCases.filter((tc) => tc.input || tc.expected),
    };

    try {
      if (editingId) {
        await api.put(`/problems/${editingId}`, payload);
      } else {
        await api.post("/problems", payload);
      }
      loadProblems();
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Couldn't save this problem.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/problems/${id}`);
      loadProblems();
    } catch (err) {
      setError(err.message || "Couldn't delete this problem.");
    }
  };

  const updateTestCase = (index, field, value) => {
    setForm((f) => ({
      ...f,
      testCases: f.testCases.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)),
    }));
  };

  const addTestCase = () => {
    setForm((f) => ({ ...f, testCases: [...f.testCases, { input: "", expected: "" }] }));
  };

  const removeTestCase = (index) => {
    setForm((f) => ({ ...f, testCases: f.testCases.filter((_, i) => i !== index) }));
  };

  const handleToggleBan = async (userId) => {
    try {
      await api.post(`/users/${userId}/ban`);
      loadUsers();
    } catch (err) {
      setError(err.message || "Couldn't update ban status.");
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-lg2 py-xl2">
      <h1 className="font-display text-display-md text-ink mb-lg2">Admin Dashboard</h1>

      <div className="flex gap-md2 mb-lg2 border-b border-hairline">
        {[
          { id: "problems", label: "Problems" },
          { id: "users", label: "Users" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-sm2 font-body text-body-sm ${
              tab === t.id ? "text-ink border-b-2 border-accent-blue" : "text-ink-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="font-body text-body-sm text-gradient-coral mb-md2">{error}</p>}

      {tab === "problems" && (
        <div>
          <div className="flex justify-end mb-md2">
            <Button variant="primary" size="sm" onClick={openCreateForm}>
              New problem
            </Button>
          </div>

          {showForm && (
            <div className="bg-surface-1 rounded-xl p-md2 mb-lg2 flex flex-col gap-md2">
              <h2 className="font-body text-headline text-ink">
                {editingId ? "Edit problem" : "Create problem"}
              </h2>

              <TextInput
                label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <label className="flex flex-col gap-xs2">
                <span className="font-body text-caption text-ink-muted">Description</span>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[14px] py-[10px] outline-none resize-y"
                />
              </label>

              <div className="flex flex-col md:flex-row gap-md2">
                <label className="flex flex-col gap-xs2 flex-1">
                  <span className="font-body text-caption text-ink-muted">Difficulty</span>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="bg-surface-2 text-ink font-body text-body-sm rounded-md px-[14px] py-[10px] outline-none"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </label>
                <TextInput
                  label="Topic"
                  className="flex-1"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-md2">
                <TextInput
                  label="Tags (comma-separated)"
                  className="flex-1"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
                <TextInput
                  label="Companies (comma-separated)"
                  className="flex-1"
                  value={form.companies}
                  onChange={(e) => setForm({ ...form, companies: e.target.value })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-xs2">
                  <span className="font-body text-caption text-ink-muted">
                    Test cases (stdin / expected stdout)
                  </span>
                  <button onClick={addTestCase} className="font-body text-caption text-accent-blue">
                    + Add test case
                  </button>
                </div>
                <div className="flex flex-col gap-xs2">
                  {form.testCases.map((tc, i) => (
                    <div key={i} className="flex gap-xs2 items-center">
                      <input
                        placeholder="stdin"
                        value={tc.input}
                        onChange={(e) => updateTestCase(i, "input", e.target.value)}
                        className="flex-1 bg-surface-2 text-ink font-body text-body-sm rounded-md px-[10px] py-[6px] outline-none"
                      />
                      <input
                        placeholder="expected stdout"
                        value={tc.expected}
                        onChange={(e) => updateTestCase(i, "expected", e.target.value)}
                        className="flex-1 bg-surface-2 text-ink font-body text-body-sm rounded-md px-[10px] py-[6px] outline-none"
                      />
                      <button
                        onClick={() => removeTestCase(i)}
                        className="font-body text-caption text-gradient-coral px-xs2"
                        aria-label="Remove test case"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-sm2 justify-end">
                <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : editingId ? "Save changes" : "Create problem"}
                </Button>
              </div>
            </div>
          )}

          {loading ? (
            <p className="font-body text-body-sm text-ink-muted">Loading…</p>
          ) : (
            <div className="rounded-xl overflow-hidden border border-hairline">
              {problems.map((p, i) => (
                <div
                  key={p._id}
                  className={`flex items-center justify-between px-md2 py-sm2 flex-wrap gap-sm2 ${
                    i % 2 === 0 ? "bg-canvas" : "bg-surface-1/40"
                  }`}
                >
                  <div className="flex items-center gap-md2">
                    <span className="font-body text-body-sm text-ink">{p.title}</span>
                    <DifficultyBadge level={p.difficulty} />
                    <span className="font-body text-caption text-ink-muted">{p.topic}</span>
                  </div>
                  <div className="flex gap-sm2">
                    <button
                      onClick={() => openEditForm(p)}
                      className="font-body text-caption text-accent-blue"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="font-body text-caption text-gradient-coral"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "users" && (
        <>
          {loading ? (
            <p className="font-body text-body-sm text-ink-muted">Loading…</p>
          ) : (
            <div className="rounded-xl overflow-hidden border border-hairline">
              {users.map((u, i) => (
                <div
                  key={u._id}
                  className={`flex items-center justify-between px-md2 py-sm2 ${
                    i % 2 === 0 ? "bg-canvas" : "bg-surface-1/40"
                  }`}
                >
                  <div className="flex items-center gap-sm2">
                    <Avatar name={u.name} size="sm" />
                    <span className="font-body text-body-sm text-ink">{u.name}</span>
                    <span className="font-body text-caption text-ink-muted">{u.role}</span>
                    {u.banned && (
                      <span className="font-body text-caption text-gradient-coral">Banned</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleBan(u._id)}
                    className={`font-body text-caption ${
                      u.banned ? "text-accent-blue" : "text-gradient-coral"
                    }`}
                  >
                    {u.banned ? "Unban" : "Ban"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
