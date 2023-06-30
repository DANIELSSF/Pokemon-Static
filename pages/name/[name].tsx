import { useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { PokemonInfo, PokemonListResponse } from '../../interfaces';
import localFavorites from '../../utils/localFavorites';
import { MainLayout } from '../../components/Layouts/MainLayout';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Prop {
  pokemon: PokemonInfo;
}

const PokemonByNamePage: NextPage<Prop> = ({ pokemon }) => {
  const [existInFavorites, setExistInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setExistInFavorites(!existInFavorites);
    if (existInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
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
                    {pokemon.typePokemon}
                  </Text>
                </Text>
              </Text>

              <Button
                color={'gradient'}
                bordered={!existInFavorites}
                onPress={onToggleFavorite}
              >
                {existInFavorites
                  ? 'Eliminar de favoritos'
                  : 'Agregar a favoritos'}
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


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonsName: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonsName.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;