import { typeChart, types } from "../data/typeChart.js";
import { getCandidatePokemon } from "../services/pokedexService.js";

function getMultiplier(attackingType, defendingTypes) {
  let multiplier = 1;

  for (const defendingType of defendingTypes) {
    const data = typeChart[defendingType];

    if (!data) continue;

    if (data.immuneTo.includes(attackingType)) multiplier *= 0;
    else if (data.weakTo.includes(attackingType)) multiplier *= 2;
    else if (data.resists.includes(attackingType)) multiplier *= 0.5;
  }

  return multiplier;
}

function getCandidateCoverage(candidate) {
  const coverage = new Set();

  for (const attackingType of candidate.types) {
    const strongAgainst = typeChart[attackingType]?.strongAgainst || [];

    for (const targetType of strongAgainst) {
      coverage.add(targetType);
    }
  }

  return coverage;
}

export async function recommendPokemon(team, analysis) {
  const candidatePokemon = await getCandidatePokemon();
  const existingNames = new Set(team.map((pokemon) => pokemon.name));
  const existingTypes = new Set(team.flatMap((pokemon) => pokemon.types));

  const defensiveGaps = analysis.defensiveAnalysis
    .filter((item) => item.weakCount >= 2)
    .map((item) => item.attackingType);

  const offensiveGaps = analysis.offensiveCoverage
    .filter((item) => !item.covered)
    .map((item) => item.defendingType);

  const scoredCandidates = candidatePokemon
    .filter((candidate) => !existingNames.has(candidate.name))
    .map((candidate) => {
      let score = 50;
      const fixesWeaknesses = [];
      const addsCoverage = [];
      const newRisks = [];

      for (const gapType of defensiveGaps) {
        const multiplier = getMultiplier(gapType, candidate.types);

        if (multiplier === 0) {
          score += 18;
          fixesWeaknesses.push(`${gapType} immunity`);
        } else if (multiplier < 1) {
          score += 12;
          fixesWeaknesses.push(`${gapType} resistance`);
        } else if (multiplier > 1) {
          score -= 10;
          newRisks.push(`${gapType} weakness`);
        }
      }

      const candidateCoverage = getCandidateCoverage(candidate);

      for (const gapType of offensiveGaps) {
        if (candidateCoverage.has(gapType)) {
          score += 8;
          addsCoverage.push(gapType);
        }
      }

      for (const type of candidate.types) {
        if (existingTypes.has(type)) {
          score -= 4;
        }
      }

      for (const attackingType of types) {
        const multiplier = getMultiplier(attackingType, candidate.types);

        if (multiplier >= 4) {
          score -= 8;
          newRisks.push(`${attackingType} 4x weakness`);
        }
      }

      score = Math.max(0, Math.min(100, score));

      return {
        name: candidate.name,
        types: candidate.types,
        role: candidate.role,
        sprite: candidate.sprite,
        score,
        fixesWeaknesses,
        addsCoverage,
        newRisks
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return scoredCandidates;
}