import { FC } from 'react';

import { Card, Grid, Row, Text } from '@nextui-org/react';

import { SmallPokemon } from '../../interfaces/pokemon-list';
import { useRouter } from 'next/router';

interface Prop {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Prop> = ({ pokemon }) => {
  const { img, name, id } = pokemon;

  const router = useRouter();

  const handleOnClick = (): void => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card isPressable isHoverable onPress={handleOnClick}>
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
  );
};
