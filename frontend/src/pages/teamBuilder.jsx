import { useState } from "react";
import { analyzeTeam } from "../api/teamApi";
import { fetchPokemonByName } from "../api/pokemonApi";
import RecommendationList from "../components/RecommendationList";
import DefensiveAnalysis from "../components/DefensiveAnalysis";
import OffensiveCoverage from "../components/OffensiveCoverage";
import TeamList from "../components/TeamList";
import PokemonSearch from "../components/PokemonSearch";

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
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1>Pokémon Team Optimiser</h1>

      <PokemonSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddPokemon={handleAddPokemon}
        loadingPokemon={loadingPokemon}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section style={{ marginTop: "2.5rem" }}>
        <h2>Current Team ({team.length}/6)</h2>

        <TeamList team={team} onRemovePokemon={handleRemovePokemon} />

        <button onClick={handleAnalyzeTeam} disabled={loadingAnalysis} style={{padding: "0.6rem 1rem", borderRadius: "6px", border: "none", background: "#333", color: "white", cursor: "pointer"}}>
          {loadingAnalysis ? "Analysing..." : "Analyse Team"}
        </button>
      </section>

      {analysisResult && (
        <section style={{ marginTop: "2.5rem" }}>
          <RecommendationList recommendations={analysisResult.recommendations} />
          <DefensiveAnalysis defensiveAnalysis={analysisResult.defensiveAnalysis} />
          <OffensiveCoverage offensiveCoverage={analysisResult.offensiveCoverage} />

        </section>
      )}
    </main>
  );
}

export default TeamBuilder;