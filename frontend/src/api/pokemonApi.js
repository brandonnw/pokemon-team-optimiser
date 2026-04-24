export async function fetchPokemonByName(name) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
  );

  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map((entry) => entry.type.name)
  };
}