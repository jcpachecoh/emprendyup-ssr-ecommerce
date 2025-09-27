'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye, Trash2, Bookmark } from 'lucide-react';
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS_BY_STORE = gql`
  query GetProductsByStore($storeId: String!, $page: Int, $pageSize: Int) {
    productsByStore(storeId: $storeId, page: $page, pageSize: $pageSize) {
      items {
        id
        name
        title
        price
        currency
        available
        inStock
        stock
        images {
          id
          url
          order
        }
        colors {
          id
          color
          colorHex
        }
        categories {
          category {
            id
            name
            slug
          }
        }
      }
      total
      page
      pageSize
    }
  }
`;

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;

  // Load user and favorites from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }

      const storedFavs = localStorage.getItem('emprendyup_favorites');
      if (storedFavs) {
        const ids = JSON.parse(storedFavs);
        setFavoriteIds(Array.isArray(ids) ? ids : []);
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      setFavoriteIds([]);
    }

    // Update favorites in real-time when localStorage changes
    const handleStorageChange = () => {
      try {
        const storedFavs = localStorage.getItem('emprendyup_favorites');
        if (storedFavs) {
          const ids = JSON.parse(storedFavs);
          setFavoriteIds(Array.isArray(ids) ? ids : []);
        }
      } catch {
        setFavoriteIds([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // GraphQL query for products by store
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_STORE, {
    variables: {
      storeId: userData?.store?.id || '',
      page: currentPage,
      pageSize: productsPerPage,
    },
    skip: !userData?.store?.id,
  });

  const allProducts = data?.productsByStore.items || [];
  const favoriteProducts = allProducts.filter((p: any) => favoriteIds.includes(p.id));

  const handleRemoveFromFavorites = (productId: string) => {
    try {
      const updated = favoriteIds.filter((id) => id !== productId);
      setFavoriteIds(updated);
      localStorage.setItem('emprendyup_favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const clearAllFavorites = () => {
    setFavoriteIds([]);
    localStorage.removeItem('emprendyup_favorites');
    window.dispatchEvent(new Event('storage'));
  };

  if (!userData) {
    return <div className="mt-24 text-center text-gray-500">Cargando usuario...</div>;
  }

  if (loading) {
    return (
      <div className="space-y-6 mt-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (favoriteIds.length === 0) {
    return (
      <div className="text-center py-12 mt-24">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-black mb-2">No tienes favoritos aún</h3>
        <p className="text-gray-500 mb-6">
          Agrega productos a tus favoritos para encontrarlos fácilmente más tarde
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Mis Favoritos</h2>
          <p className="text-gray-600 mt-1">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'producto' : 'productos'} en
            tu lista de favoritos
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Limpiar Todo
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {favoriteProducts.map((product: any) => {
          const imageSrc = `https://emprendyup-images.s3.us-east-1.amazonaws.com/${
            product.images?.[0]?.url || product.image
          }`;

          return (
            <div className="group relative duration-500 w-full mx-auto" key={product.id}>
              <div className="flex flex-col items-center">
                <div
                  className="relative overflow-hidden w-full shadow hover:shadow-lg rounded-md duration-500"
                  style={{ height: '320px' }}
                >
                  <Image
                    src={imageSrc}
                    alt={product.title || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                    <li>
                      <button
                        className="size-10 inline-flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow"
                        onClick={() => handleRemoveFromFavorites(product.id)}
                        title="Eliminar de favoritos"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                    <li className="mt-1">
                      <Link
                        href={`/products/${product.id}`}
                        className="size-10 inline-flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </li>
                    <li className="mt-1">
                      <Link
                        href="#"
                        className="size-10 inline-flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                      >
                        <Bookmark className="size-4" />
                      </Link>
                    </li>
                  </ul>

                  <div className="absolute top-[10px] start-4">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Heart className="size-3 fill-current" />
                      Favorito
                    </span>
                  </div>
                </div>

                <div className="w-full mt-4 text-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-lg font-medium block hover:transition-colors"
                  >
                    {product.title || product.name}
                  </Link>
                  <p className="text-slate-400 mt-2 line-clamp-2">{product.description}</p>
                  <p className="mt-2 font-semibold">
                    ${Number(product.price).toLocaleString('es-CO')} {product.currency || 'COP'}
                  </p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="py-2 px-4 inline-block font-semibold text-sm text-white rounded-md shadow hover:opacity-90">
                      Añadir al carrito
                    </button>
                    <button
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      className="py-2 px-4 inline-block font-semibold text-sm bg-red-100 text-red-600 rounded-md shadow hover:bg-red-500 hover:text-white"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
