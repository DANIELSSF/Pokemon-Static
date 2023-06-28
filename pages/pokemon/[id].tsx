import { useState } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import localFavorites from '../../utils/localFavorites';
import { MainLayout } from '../../components/Layouts';
import { pokeApi } from '../../api';
import { PokemonInfo } from '../../interfaces';

interface Prop {
  pokemon: PokemonInfo;
}

const PokemonPage: NextPage<Prop> = ({ pokemon }) => {
  const [existInFavorites, setExistInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setExistInFavorites(!existInFavorites);
  };

  return (
    <MainLayout title={`Pokemon | ${pokemon.name}`}>
      <Grid.Container
        gap={2}
        css={{ marginTop: '5px', height: 'calc(100vh-56px)' }}
      >
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-Image'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card isHoverable>
            <Card.Header
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 30px',
              }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
                <Text css={{ fontSize: '1.2rem' }}>
                  Tipo:{' '}
                  <Text span transform="capitalize">
                    {pokemon.types[0].type.name}
                  </Text>
                </Text>
              </Text>

              <Button
                color={'gradient'}
                bordered={!existInFavorites}
                onPress={onToggleFavorite}
              >
                {existInFavorites ? 'Eliminar de favorito' : 'Agregar Favorito'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text h3 css={{ padding: '0 25px' }}>
                Sprites:
              </Text>
              <Container display="flex" direction="row">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
