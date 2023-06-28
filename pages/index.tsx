import { NextPage, GetStaticProps } from 'next';

import { MainLayout } from '../components/Layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface HomePageProps {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  return (
    <MainLayout title="Pokemon List">
      <Grid.Container
        gap={2}
        justify="flex-start"
        css={{ height: 'calc(100vh - 80px)' }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </Grid.Container>
    </MainLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`;
    return {
      ...pokemon,
      id: index + 1,
      img: urlImage,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};
