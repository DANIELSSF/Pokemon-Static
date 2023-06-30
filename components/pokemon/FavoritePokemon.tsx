import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoritePokemonCard } from '.';

interface Prop {
  pokemons: number[];
}

export const FavoritePokemon: FC<Prop> = ({ pokemons }) => {

  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoritePokemonCard pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};
