import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function DiscussionPanel({ problemId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get(`/problems/${problemId}/comments`)
      .then(({ comments }) => setComments(comments))
      .catch((err) => setError(err.message || "Couldn't load discussion."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  const postComment = async () => {
    if (!newComment.trim()) return;
    if (!user) {
      setError("Sign in to join the discussion.");
      return;
    }
    try {
      await api.post(`/problems/${problemId}/comments`, { text: newComment });
      setNewComment("");
      load();
    } catch (err) {
      setError(err.message || "Couldn't post your comment.");
    }
  };

  const postReply = async (commentId) => {
    if (!replyText.trim()) return;
    try {
      await api.post(`/problems/${problemId}/comments`, {
        text: replyText,
        parentComment: commentId,
      });
      setReplyText("");
      setReplyTo(null);
      load();
    } catch (err) {
      setError(err.message || "Couldn't post your reply.");
    }
  };

  if (loading) {
    return (
      <div className="p-md2">
        <p className="font-body text-body-sm text-ink-muted">Loading discussion…</p>
      </div>
    );
  }

  return (
    <div className="p-md2 flex flex-col gap-md2">
      {error && <p className="font-body text-caption text-gradient-coral">{error}</p>}

      <div className="flex gap-sm2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Share your approach…" : "Sign in to comment"}
          disabled={!user}
          className="flex-1 bg-surface-1 text-ink font-body text-body-sm rounded-md px-[12px] py-[8px] outline-none placeholder:text-ink-muted disabled:opacity-50"
        />
        <button
          onClick={postComment}
          disabled={!user}
          className="font-body text-body-sm text-on-primary bg-primary rounded-pill px-[14px] py-[8px] disabled:opacity-50"
        >
          Post
        </button>
      </div>

      {comments.length === 0 && (
        <p className="font-body text-body-sm text-ink-muted">Be the first to start a discussion.</p>
      )}

      <div className="flex flex-col gap-md2">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-sm2">
            <Avatar name={c.author?.name || "Unknown"} size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-xs2">
                <span className="font-body text-body-sm text-ink">{c.author?.name || "Unknown"}</span>
                <span className="font-body text-micro text-ink-muted">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="font-body text-body-sm text-ink-muted">{c.text}</p>
              {user && (
                <button
                  onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
                  className="font-body text-caption text-accent-blue mt-xxs"
                >
                  Reply
                </button>
              )}

              {replyTo === c._id && (
                <div className="flex gap-xs2 mt-xs2">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply…"
                    className="flex-1 bg-surface-1 text-ink font-body text-body-sm rounded-md px-[10px] py-[6px] outline-none placeholder:text-ink-muted"
                  />
                  <button
                    onClick={() => postReply(c._id)}
                    className="font-body text-caption text-ink bg-surface-2 rounded-pill px-[12px] py-[6px]"
                  >
                    Reply
                  </button>
                </div>
              )}

              {c.replies?.length > 0 && (
                <div className="flex flex-col gap-sm2 mt-sm2 pl-md2 border-l border-hairline">
                  {c.replies.map((r) => (
                    <div key={r._id} className="flex gap-xs2">
                      <Avatar name={r.author?.name || "Unknown"} size="sm" />
                      <div>
                        <div className="flex items-center gap-xs2">
                          <span className="font-body text-body-sm text-ink">
                            {r.author?.name || "Unknown"}
                          </span>
                          <span className="font-body text-micro text-ink-muted">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-body text-body-sm text-ink-muted">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
