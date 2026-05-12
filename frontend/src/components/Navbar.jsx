import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">◒</span>
        <span>Pokémon Optimiser</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" className="nav-link">
          Team Builder
        </NavLink>

        <NavLink to="/saved-teams" className="nav-link">
          Saved Teams
        </NavLink>
      </nav>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <span className="navbar-user">Hi, {user?.username}</span>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;