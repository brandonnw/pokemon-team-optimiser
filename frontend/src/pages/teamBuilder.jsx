import { useState } from "react";
import { analyzeTeam } from "../api/teamApi";
import { fetchPokemonByName } from "../api/pokemonApi";
import PokemonSearch from "../components/PokemonSearch";
import TeamList from "../components/TeamList";
import RecommendationList from "../components/RecommendationList";
import DefensiveAnalysis from "../components/DefensiveAnalysis";
import OffensiveCoverage from "../components/OffensiveCoverage";
import PokemonRecommendations from "../components/PokemonRecommendations";

function TeamBuilder() {
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [pokemonRecommendations, setPokemonRecommendations] = useState([]);
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
      setAiSummary(null);
      setPokemonRecommendations([]);
    } catch (error) {
      setError("Could not find that Pokémon. Try names like pikachu or charizard.");
    } finally {
      setLoadingPokemon(false);
    }
  }

  function handleRemovePokemon(id) {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
    setAnalysisResult(null);
    setAiSummary(null);
    setPokemonRecommendations([]);
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
      setPokemonRecommendations(data.pokemonRecommendations || []);
      setAiSummary(data.aiSummary);
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
        <div className="hero-badge">Battle Balance Dashboard</div>
        <h1>Build smarter Pokémon teams with data-driven analysis.</h1>
        <p>
          Search Pokémon, build a team of up to six, analyse defensive weaknesses, offensive coverage,
          resistances, immunities, and received customised recommendations.
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
            <RecommendationList
              recommendations={analysisResult.recommendations}
              aiSummary={aiSummary}
            />

            <OffensiveCoverage offensiveCoverage={analysisResult.offensiveCoverage} />
          </section>

          <DefensiveAnalysis defensiveAnalysis={analysisResult.defensiveAnalysis} />
          <PokemonRecommendations recommendations={pokemonRecommendations} />
        </>
      )}
    </main>
  );
}

export default TeamBuilder;