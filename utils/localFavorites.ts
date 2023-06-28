const toggleFavorite = (id: number) => {
  let pokemonsFavorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  pokemonsFavorites.filter((pokeid) => pokeid !== id);

  if (!pokemonsFavorites.includes(id)) {
    pokemonsFavorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(pokemonsFavorites));
};

const existInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const pokemonsFavorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  return pokemonsFavorites.includes(id);
};

export default { toggleFavorite, existInFavorites };
