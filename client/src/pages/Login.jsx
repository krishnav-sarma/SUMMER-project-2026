import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    try {
      await login(form.email, form.password);
      navigate("/problems");
    } catch (err) {
      setError(err.message || "Sign in failed. Check your credentials and try again.");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto px-lg2 py-section">
      <h1 className="font-display text-display-md text-ink mb-xs2 text-center">
        Sign in
      </h1>
      <p className="font-body text-body-sm text-ink-muted text-center mb-xl2">
        Pick up where you left off.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-md2">
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && (
          <p className="font-body text-caption text-gradient-coral">{error}</p>
        )}

        <Button type="submit" variant="primary" className="w-full mt-xs2">
          Sign in
        </Button>
      </form>

      <p className="font-body text-caption text-ink-muted text-center mt-lg2">
        No account?{" "}
        <Link to="/register" className="text-accent-blue">
          Create one
        </Link>
      </p>
    </div>
  );
}
