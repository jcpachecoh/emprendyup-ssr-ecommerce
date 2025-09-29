'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Loader } from 'lucide-react';

const PAGINATED_PRODUCTS_QUERY = gql`
  query GetPaginatedProducts($page: Int!, $pageSize: Int!) {
    paginatedProducts(page: $page, pageSize: $pageSize) {
      items {
        id
        name
        price
        description
        images {
          url
        }
      }
      total
      page
      pageSize
    }
  }
`;

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[] | null>(null);

  // Cargar favoritos del localStorage en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(localStorage.getItem('emprendyup_favorites') || '[]');
      setFavoriteIds(storedFavorites);
    }
  }, []);

  // 🚨 Hook siempre se ejecuta, pero lo saltamos hasta que haya favoritos
  const { loading, error, data } = useQuery(PAGINATED_PRODUCTS_QUERY, {
    variables: { page: 1, pageSize: 500 },
    skip: favoriteIds === null, // no ejecuta hasta que tengamos favoritos cargados
  });

  if (favoriteIds === null || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error al cargar los favoritos</p>;
  }

  const allProducts = data?.paginatedProducts?.items || [];
  const favoriteProducts = allProducts.filter((p: any) => favoriteIds.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-gray-600">No tienes productos favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteProducts.map((product: any) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]?.url || '/placeholder.png'}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
