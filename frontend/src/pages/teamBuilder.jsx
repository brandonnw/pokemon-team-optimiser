import { useState } from "react";
import { analyzeTeam } from "../api/teamApi";
import { fetchPokemonByName } from "../api/pokemonApi";
import PokemonSearch from "../components/PokemonSearch";
import TeamList from "../components/TeamList";
import RecommendationList from "../components/RecommendationList";
import DefensiveAnalysis from "../components/DefensiveAnalysis";
import OffensiveCoverage from "../components/OffensiveCoverage";

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
    <main className="app-container">
      <section className="hero">
        <div className="hero-badge">Type Matchup Engine</div>
        <h1>Build smarter Pokémon teams with data-driven analysis.</h1>
        <p>
          Search Pokémon, build a team of up to six, and analyse defensive weaknesses,
          resistances, immunities, and offensive coverage in one clean dashboard.
        </p>
      </section>

      <section className="card">
        <h2>Add Pokémon</h2>

        <PokemonSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddPokemon={handleAddPokemon}
          loadingPokemon={loadingPokemon}
        />

        {error && <div className="error-box">{error}</div>}
      </section>

      <section className="card">
        <h2>Current Team ({team.length}/6)</h2>

        <TeamList team={team} onRemovePokemon={handleRemovePokemon} />

        <button
          className="button"
          onClick={handleAnalyzeTeam}
          disabled={loadingAnalysis}
        >
          {loadingAnalysis ? "Analysing..." : "Analyse Team"}
        </button>
      </section>

      {analysisResult && (
        <>
          <section className="grid">
            <RecommendationList recommendations={analysisResult.recommendations} />

            <OffensiveCoverage offensiveCoverage={analysisResult.offensiveCoverage} />
          </section>

          <DefensiveAnalysis defensiveAnalysis={analysisResult.defensiveAnalysis} />
        </>
      )}
    </main>
  );
}

export default TeamBuilder;