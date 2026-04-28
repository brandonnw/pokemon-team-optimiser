const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

let cachedPokemon = null;

export async function getCandidatePokemon(limit = 151) {
  if (cachedPokemon) {
    return cachedPokemon;
  }

  const listResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);
  const listData = await listResponse.json();

  const pokemonDetails = await Promise.all(
    listData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        types: data.types.map((entry) => entry.type.name),
        sprite: data.sprites.front_default,
        baseStatsTotal: data.stats.reduce(
          (total, statEntry) => total + statEntry.base_stat,
          0
        )
      };
    })
  );

  cachedPokemon = pokemonDetails;

  return cachedPokemon;
}