import { NextPage, GetStaticProps } from 'next';

import { MainLayout } from '../components/Layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Card, Grid, Row, Text } from '@nextui-org/react';

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
        {pokemons.map(({ name, img, id }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card isPressable isHoverable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image src={img} width="100%" height={140} alt={name} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
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
