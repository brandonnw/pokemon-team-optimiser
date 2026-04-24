import { useState } from "react";
import { analyzeTeam } from "../api/teamApi";

const testTeam = [
  { name: "charizard", types: ["fire", "flying"] },
  { name: "garchomp", types: ["dragon", "ground"] },
  { name: "lapras", types: ["water", "ice"] }
];

function TeamBuilder() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyzeTeam() {
    try {
      setLoading(true);
      const data = await analyzeTeam(testTeam);
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error(error);
      alert("Failed to analyse team");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokémon Team Optimiser</h1>

      <section>
        <h2>Current Team</h2>
        <ul>
          {testTeam.map((pokemon) => (
            <li key={pokemon.name}>
              <strong>{pokemon.name}</strong> — {pokemon.types.join(", ")}
            </li>
          ))}
        </ul>

        <button onClick={handleAnalyzeTeam} disabled={loading}>
          {loading ? "Analysing..." : "Analyse Team"}
        </button>
      </section>

      {analysisResult && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Analysis Result</h2>
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