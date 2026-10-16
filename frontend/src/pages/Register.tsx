import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.token, data.username, data.role);
      nav("/");
    } catch (err: any) {
      // Show the REAL error
      let msg = "Registration failed";
      if (err.response) {
        msg = err.response.data?.message || err.response.data?.error || JSON.stringify(err.response.data);
        msg = `Error ${err.response.status}: ${msg}`;
      } else if (err.request) {
        msg = "Cannot reach backend. Is it running on port 8080?";
      } else {
        msg = err.message;
      }
      setError(msg);
      console.error("REGISTER ERROR:", err);
    }
  };

  return (
    <div className="auth-container">
      <h1>🛍️ Join ShopHub</h1>
      <form onSubmit={submit}>
        <input placeholder="Username" value={form.username} onChange={(e) => set("username", e.target.value)} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input placeholder="Address" value={form.address} onChange={(e) => set("address", e.target.value)} />
        {error && (
          <p style={{
            color: "red",
            background: "#fff0f0",
            padding: 10,
            borderRadius: 4,
            fontSize: 13,
            border: "1px solid #ffcccc"
          }}>
            {error}
          </p>
        )}
        <button type="submit">Register</button>
      </form>
      <p>Have account? <Link to="/login">Login</Link></p>
    </div>
  );
}