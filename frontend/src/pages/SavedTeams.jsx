import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getSavedTeams,
  deleteSavedTeam
} from "../api/savedTeamApi";

function SavedTeams() {
  const { token, isAuthenticated } = useAuth();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeams() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const data = await getSavedTeams(token);
        setTeams(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load saved teams.");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [token, isAuthenticated]);

  async function handleDelete(teamId) {
    try {
      await deleteSavedTeam(token, teamId);

      setTeams((prevTeams) =>
        prevTeams.filter((team) => team._id !== teamId)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete team.");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="app-container">
        <section className="hero">
          <div className="hero-badge">Authentication Required</div>
          <h1>Please login to view saved teams.</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="app-container">
      <section className="hero">
        <div className="hero-badge">Saved Builds</div>
        <h1>Your saved Pokémon teams.</h1>
        <p>Manage and revisit your competitive builds.</p>
      </section>

      {loading ? (
        <section className="card">
          <p>Loading teams...</p>
        </section>
      ) : error ? (
        <section className="card">
          <div className="error-box">{error}</div>
        </section>
      ) : teams.length === 0 ? (
        <section className="card">
          <p className="empty-text">No saved teams yet.</p>
        </section>
      ) : (
        <div className="saved-teams-grid">
          {teams.map((team) => (
            <section key={team._id} className="saved-team-card">
              <div className="saved-team-header">
                <div>
                  <p className="section-kicker">Saved Team</p>
                  <h2>{team.teamName}</h2>
                </div>

                <button
                  className="remove-button"
                  onClick={() => handleDelete(team._id)}
                >
                  Delete
                </button>
              </div>

              <div className="team-grid">
                {team.pokemon.map((pokemon) => (
                  <div key={pokemon.id} className="pokemon-card">
                    {pokemon.sprite && (
                      <img src={pokemon.sprite} alt={pokemon.name} />
                    )}

                    <h3>{pokemon.name}</h3>

                    <div>
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className={`type-badge type-glow-${type}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

export default SavedTeams;