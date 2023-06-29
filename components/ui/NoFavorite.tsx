import { Container, Image, Text } from '@nextui-org/react';

export const NoFavorite = () => {
  return (
    <Container
    css={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'calc(100vh - 80px)',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center,',
    }}
  >
    <Image
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
      width={250}
      height={250}
      css={{
        opacity: 0.2,
      }}
    />

    <Text h1>No hay pokemons </Text>
  </Container>
  )
}