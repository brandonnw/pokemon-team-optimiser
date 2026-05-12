import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TeamBuilder from "./pages/TeamBuilder";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedTeams from "./pages/SavedTeams";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<TeamBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved-teams" element={<SavedTeams />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;