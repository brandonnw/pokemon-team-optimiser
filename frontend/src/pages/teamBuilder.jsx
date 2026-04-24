import { useState } from "react";
import { analyzeTeam } from "../api/teamApi";
import { fetchPokemonByName } from "../api/pokemonApi";

function TeamBuilder() {
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [error, setError] = useState("");

  async function handleAddPokemon(event) {
    event.preventDefault();

    if (!searchTerm.trim()) return;

    if (team.length >= 6) {
      setError("Your team can only have up to 6 Pokémon.");
      return;
    }

    try {
      setLoadingPokemon(true);
      setError("");

      const pokemon = await fetchPokemonByName(searchTerm);

      if (team.some((member) => member.id === pokemon.id)) {
        setError("That Pokémon is already in your team.");
        return;
      }

      setTeam([...team, pokemon]);
      setSearchTerm("");
      setAnalysisResult(null);
    } catch (error) {
      setError("Could not find that Pokémon. Try names like pikachu or charizard.");
    } finally {
      setLoadingPokemon(false);
    }
  }

  function handleRemovePokemon(id) {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
    setAnalysisResult(null);
  }

  async function handleAnalyzeTeam() {
    if (team.length === 0) {
      setError("Add at least one Pokémon before analysing.");
      return;
    }

    try {
      setLoadingAnalysis(true);
      setError("");

      const cleanTeam = team.map((pokemon) => ({
        name: pokemon.name,
        types: pokemon.types
      }));

      const data = await analyzeTeam(cleanTeam);
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error(error);
      setError("Failed to analyse team.");
    } finally {
      setLoadingAnalysis(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokémon Team Optimiser</h1>

      <form onSubmit={handleAddPokemon}>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Pokémon e.g. pikachu"
          style={{ padding: "0.6rem", marginRight: "0.5rem" }}
        />

        <button type="submit" disabled={loadingPokemon}>
          {loadingPokemon ? "Adding..." : "Add Pokémon"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section style={{ marginTop: "2rem" }}>
        <h2>Current Team ({team.length}/6)</h2>

        {team.length === 0 && <p>No Pokémon added yet.</p>}

        <ul>
          {team.map((pokemon) => (
            <li key={pokemon.id} style={{ marginBottom: "1rem" }}>
              {pokemon.sprite && (
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
                />
              )}

              <strong>{pokemon.name}</strong> — {pokemon.types.join(", ")}

              <button
                onClick={() => handleRemovePokemon(pokemon.id)}
                style={{ marginLeft: "1rem" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button onClick={handleAnalyzeTeam} disabled={loadingAnalysis}>
          {loadingAnalysis ? "Analysing..." : "Analyse Team"}
        </button>
      </section>

      {analysisResult && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Recommendations</h2>

          {analysisResult.recommendations.length === 0 ? (
            <p>No major issues found.</p>
          ) : (
            <ul>
              {analysisResult.recommendations.map((recommendation, index) => (
                <li key={index}>
                  <strong>{recommendation.issue}</strong>
                  <br />
                  {recommendation.suggestion}
                </li>
              ))}
            </ul>
          )}

          <h2>Raw Analysis</h2>
          <pre
            style={{
              background: "#f3f3f3",
              padding: "1rem",
              borderRadius: "8px",
              overflowX: "auto"
            }}
          >
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}

export default TeamBuilder;