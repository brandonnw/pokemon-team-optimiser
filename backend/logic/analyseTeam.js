import { typeChart, types } from "../data/typeChart.js";

function calculateMultiplier(attackingType, defendingTypes) {
  let multiplier = 1;

  for (const defendingType of defendingTypes) {
    const data = typeChart[defendingType];

    if (!data) continue;

    if (data.immuneTo.includes(attackingType)) {
      multiplier *= 0;
    } else if (data.weakTo.includes(attackingType)) {
      multiplier *= 2;
    } else if (data.resists.includes(attackingType)) {
      multiplier *= 0.5;
    }
  }

  return multiplier;
}

function getDefensiveAnalysis(team) {
  return types.map((attackingType) => {
    const affectedPokemon = team.map((pokemon) => {
      const multiplier = calculateMultiplier(attackingType, pokemon.types);

      return {
        name: pokemon.name,
        types: pokemon.types,
        multiplier
      };
    });

    const weakPokemon = affectedPokemon.filter((pokemon) => pokemon.multiplier > 1);
    const resistantPokemon = affectedPokemon.filter(
      (pokemon) => pokemon.multiplier > 0 && pokemon.multiplier < 1
    );
    const immunePokemon = affectedPokemon.filter((pokemon) => pokemon.multiplier === 0);

    return {
      attackingType,
      weakCount: weakPokemon.length,
      resistCount: resistantPokemon.length,
      immuneCount: immunePokemon.length,
      weakPokemon,
      resistantPokemon,
      immunePokemon
    };
  });
}

function getOffensiveCoverage(team) {
  return types.map((defendingType) => {
    const attackingOptions = [];

    for (const pokemon of team) {
      for (const attackingType of pokemon.types) {
        const strongAgainst = typeChart[attackingType]?.strongAgainst || [];

        if (strongAgainst.includes(defendingType)) {
          attackingOptions.push({
            pokemon: pokemon.name,
            attackingType
          });
        }
      }
    }

    return {
      defendingType,
      covered: attackingOptions.length > 0,
      attackingOptions
    };
  });
}

function getRecommendations(defensiveAnalysis, offensiveCoverage) {
  const defensiveIssues = defensiveAnalysis
    .filter((item) => item.weakCount >= 2)
    .sort((a, b) => b.weakCount - a.weakCount)
    .slice(0, 3)
    .map((item) => ({
      type: "defensive",
      issue: `Your team has ${item.weakCount} Pokémon weak to ${item.attackingType}.`,
      suggestion: `Add a Pokémon that resists or is immune to ${item.attackingType}.`
    }));

  const coverageIssues = offensiveCoverage
    .filter((item) => !item.covered)
    .slice(0, 5)
    .map((item) => item.defendingType);

  const offensiveIssue =
    coverageIssues.length > 0
      ? [
          {
            type: "offensive",
            issue: `Your team lacks super-effective coverage against ${coverageIssues.join(", ")}.`,
            suggestion: "Add Pokémon with attacking types that cover these gaps."
          }
        ]
      : [];

  return [...defensiveIssues, ...offensiveIssue];
}

export function analyseTeam(team) {
  const defensiveAnalysis = getDefensiveAnalysis(team);
  const offensiveCoverage = getOffensiveCoverage(team);
  const recommendations = getRecommendations(defensiveAnalysis, offensiveCoverage);

  return {
    defensiveAnalysis,
    offensiveCoverage,
    recommendations
  };
}