import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Fill in your name, email, and password to continue.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password needs at least 8 characters.");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      navigate("/problems");
    } catch (err) {
      setError(err.message || "Registration failed. Try a different email.");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto px-lg2 py-section">
      <h1 className="font-display text-display-md text-ink mb-xs2 text-center">
        Create your account
      </h1>
      <p className="font-body text-body-sm text-ink-muted text-center mb-xl2">
        Free forever for solving problems.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-md2">
        <TextInput
          label="Name"
          type="text"
          placeholder="Ada Lovelace"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          placeholder="At least 8 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && (
          <p className="font-body text-caption text-gradient-coral">{error}</p>
        )}

        <Button type="submit" variant="primary" className="w-full mt-xs2">
          Create account
        </Button>
      </form>

      <p className="font-body text-caption text-ink-muted text-center mt-lg2">
        Already have an account?{" "}
        <Link to="/login" className="text-accent-blue">
          Sign in
        </Link>
      </p>
    </div>
  );
}
