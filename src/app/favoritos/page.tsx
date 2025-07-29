import React from 'react';
import Layout from '../components/layout';

import FavoritesGridClient from '../components/FavoritesGridClient';

export default function FavoritosPage() {
  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-6">Favoritos</h1>
        <FavoritesGridClient />
        <p className="mt-4">¡Gracias por visitar tu lista de favoritos!</p>
      </div>
    </Layout>
  );
}
