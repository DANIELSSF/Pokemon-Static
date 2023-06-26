import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar } from '../ui';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Daniel Santiago Silva Fonseca" />
        <meta name="description" content={`Information of Pokemon  ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex, poke`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '0 20px',
        }}
      >
        {children}
      </main>
    </>
  );
};
