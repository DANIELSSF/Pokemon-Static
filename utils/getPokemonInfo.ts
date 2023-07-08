import { PokemonInfo } from '../interfaces';
import { pokeApi } from '../api';

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<PokemonInfo>(`/pokemon/${nameOrId}`);

    return {
      sprites: data.sprites,
      name: data.name,
      id: data.id,
      typePokemon: data.types[0].type.name,
    };
  } catch (error) {
    return null;
  }
};
