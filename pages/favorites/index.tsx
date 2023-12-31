import { useEffect, useState } from 'react';

import localFavorites from '../../utils/localFavorites';
import { NoFavorite } from '../../components/ui';
import { MainLayout } from '../../components/Layouts';
import { FavoritePokemon } from '../../components/pokemon';

const FavoritePage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemon(localFavorites.pokemonsFavorites());
  }, []);

  return (
    <MainLayout title="Pokemon | Favorites">
      {favoritePokemon.length === 0 
      ? ( <NoFavorite /> ) 
      : ( <FavoritePokemon pokemons={favoritePokemon} /> ) 
      }
    </MainLayout>
  );
};

export default FavoritePage;
