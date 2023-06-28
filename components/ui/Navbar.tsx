import NextLink from 'next/link';

import { Link, Spacer, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <nav
      style={{
        alignItems: 'center',
        backgroundColor: theme?.colors.gray100.value,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        padding: '0 20px',
        width: '100%',
        height: '80px',
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png"
        alt="App icon"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref legacyBehavior>
        <Link>
          <Text h2>P</Text>
          <Text h3>okemón</Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref legacyBehavior>
        <Link>
          <Text>Favorites</Text>
        </Link>
      </NextLink>
    </nav>
  );
};
