import { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Prop {
  pokemonId: number;
}

export const FavoritePokemonCard: FC<Prop> = ({ pokemonId }) => {
  const router = useRouter();

  const onFavoriteCLick = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid xs={6} sm={4} md={3} xl={1}>
      <Card
        isHoverable
        isPressable
        css={{ padding: '10px', height: '200px' }}
        onPress={onFavoriteCLick}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          alt="Pokemon Img"
        />
      </Card>
    </Grid>
  );
};
