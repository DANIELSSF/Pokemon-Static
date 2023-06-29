import { FC } from 'react';
import { Card, Grid } from '@nextui-org/react';

interface Prop {
  pokemons: number[];
}

export const FavoritePokemon: FC<Prop> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <Grid xs={6} sm={4} md={3} xl={1} key={id}>
          <Card
            isHoverable
            isPressable
            css={{ padding: '10px', height: '200px' }}
          >
            <Card.Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt="Pokemon Img"
            />
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};
