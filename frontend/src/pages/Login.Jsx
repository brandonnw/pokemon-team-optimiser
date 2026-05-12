import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const data = await loginUser(formData);

      login(data);

      window.location.href = "/";
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="auth-hero-badge">Pokémon Team Optimiser</div>

        <h1>Welcome back, trainer.</h1>

        <p>
          Continue building competitive teams with AI-powered analysis,
          matchup insights, and advanced recommendation algorithms.
        </p>

        <div className="auth-feature-list">
          <div className="auth-feature-card">
            <h3>Type Matchup Engine</h3>
            <p>Analyse weaknesses, resistances, immunities, and 4× threats.</p>
          </div>

          <div className="auth-feature-card">
            <h3>Recommendation Algorithm</h3>
            <p>Rank Pokémon additions using weighted scoring logic.</p>
          </div>

          <div className="auth-feature-card">
            <h3>AI Team Insights</h3>
            <p>Generate strategic summaries for competitive team building.</p>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="card auth-card">
          <p className="section-kicker">Trainer Login</p>

          <h1>Login</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button className="button" type="submit">
              Login
            </button>
          </form>

          {error && <div className="error-box">{error}</div>}

          <p className="auth-switch-text">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;