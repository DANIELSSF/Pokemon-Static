import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Navbar } from '../ui';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const origin =
  window.location.origin === 'undefined' ? '' : window.location.origin;

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Daniel Santiago Silva Fonseca" />
        <meta name="description" content={`Information of Pokemon  ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex, poke`} />

        <meta property="og:title" content={`Information about ${title}.`} />
        <meta
          property="og:description"
          content={`Pokemon ${title}, description, types and images`}
        />
        <meta property="og:image" content={`${origin}img/banner.png`} />
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
