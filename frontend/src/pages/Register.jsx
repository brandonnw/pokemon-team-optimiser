import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
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

      const data = await registerUser(formData);

      login(data);

      window.location.href = "/";
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="auth-hero-badge">Pokémon Team Optimiser</div>

        <h1>Create your trainer account.</h1>

        <p>
          Save teams, track builds, and use advanced recommendation systems to
          optimise competitive Pokémon strategies.
        </p>

        <div className="auth-feature-list">
          <div className="auth-feature-card">
            <h3>Save Team Builds</h3>
            <p>Store and revisit your strongest competitive teams.</p>
          </div>

          <div className="auth-feature-card">
            <h3>Advanced Recommendations</h3>
            <p>Discover optimal Pokémon additions using scoring algorithms.</p>
          </div>

          <div className="auth-feature-card">
            <h3>Full Analysis Dashboard</h3>
            <p>Visualise matchup risks and offensive coverage instantly.</p>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="card auth-card">
          <p className="section-kicker">Trainer Registration</p>

          <h1>Create Account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

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
              Create Account
            </button>
          </form>

          {error && <div className="error-box">{error}</div>}

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;