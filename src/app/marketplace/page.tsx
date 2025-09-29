'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { FiHeart, FiEye, FiBookmark, FiChevronLeft, FiChevronRight } from '../assets/icons/vander';
import Cta from '../components/cta';
import Client from '../components/client';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';
import toast from 'react-hot-toast';
import { Heart, ShoppingCart } from 'lucide-react';
import { cartService } from '@/lib/Cart';

const PAGINATED_PRODUCTS_QUERY = gql`
  query GetPaginatedProducts($page: Int, $pageSize: Int) {
    paginatedProducts(pagination: { page: $page, pageSize: $pageSize }) {
      items {
        id
        name
        title
        description
        price
        currency
        storeId
        available
        createdAt
        updatedAt
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
        sizes {
          id
          size
        }
        comments {
          id
          rating
          comment
          createdAt
        }
      }
      total
      page
      pageSize
    }
  }
`;

const favoritesService = {
  getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const favorites = localStorage.getItem('emprendyup_favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch {
      return [];
    }
  },
  isFavorite(productId: string): boolean {
    return this.getFavorites().includes(productId);
  },
  toggleFavorite(productId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(productId);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('emprendyup_favorites', JSON.stringify(favorites));
      window.dispatchEvent(new Event('storage'));
      return false;
    } else {
      favorites.push(productId);
      localStorage.setItem('emprendyup_favorites', JSON.stringify(favorites));
      window.dispatchEvent(new Event('storage'));
      return true;
    }
  },
};

export interface ProductImage {
  id: string;
  url: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: ProductImage[];
  rating?: number;
  reviews?: number;
  category: string;
  description: string;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
}

export default function Marketplace() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data, loading, error } = useQuery(PAGINATED_PRODUCTS_QUERY, {
    variables: { page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.paginatedProducts?.items || [];
  const total = data?.paginatedProducts?.total || 0;
  const totalPages = Math.ceil(total / pageSize);
  useEffect(() => {
    setFavorites(favoritesService.getFavorites());

    const handler = () => setFavorites(favoritesService.getFavorites());
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);
  if (error) return <p className="text-center py-10 text-red-500">Error al cargar productos</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(...range);

    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleAddToCart = async (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      cartService.addItem({
        id: `${item.id}-${Date.now()}`,
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.images?.[0]?.url
          ? `https://emprendyup-images.s3.us-east-1.amazonaws.com/${item.images[0].url}`
          : '/assets/default-product.jpg',
      });
      window.dispatchEvent(new Event('storage'));
      toast.success(`${item.name} ha sido agregado al carrito.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Hubo un problema al agregar el producto al carrito.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleToggleFavorite = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    try {
      const newFavoriteState = favoritesService.toggleFavorite(item.id);
      setFavorites(favoritesService.getFavorites()); // 🔑 actualizamos estado

      if (newFavoriteState) {
        toast.success(`${item.name} agregado a favoritos`, { icon: '❤️' });
      } else {
        toast.success(`${item.name} eliminado de favoritos`, { icon: '💔' });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Hubo un problema al gestionar favoritos.');
    }
  };
  const isFavorite = (productId: string) => favorites.includes(productId);

  const getImageUrl = (item: Product) => {
    const imageKey = item?.images?.[0]?.url;
    return imageKey
      ? `https://emprendyup-images.s3.us-east-1.amazonaws.com/${imageKey}`
      : '/assets/default-product.jpg';
  };

  const visiblePages = getVisiblePages();

  return (
    <>
      {/* HERO */}
      <section className="relative md:flex table w-full items-center md:h-screen py-36 bg-[url('/images/hero/bg4.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-transparent"></div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container relative text-center z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge superior con efecto cristal */}
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span className="w-2 h-2 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full animate-pulse"></span>
              <span className="uppercase font-semibold text-sm tracking-wider text-white/90">
                ✨ Colección Exclusiva
              </span>
            </div>

            {/* Título principal con gradiente */}
            <h1 className="md:text-7xl text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white/80 mb-6 leading-tight">
              Brilla con
              <span className="block md:text-8xl text-6xl bg-gradient-to-r from-fourth-base to-fourth-base to-slate-900 bg-clip-text text-transparent animate-pulse">
                Elegancia
              </span>
            </h1>

            {/* Descripción mejorada */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Descubre nuestra nueva colección donde cada pieza cuenta una historia única de
              <span className="text-fourth-base font-medium"> sofisticación</span> y
              <span className="text-fourth-base font-medium"> estilo</span>
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Link
                href="/tienda"
                className="group relative px-8 py-4 bg-fourth-base text-white font-bold text-lg rounded-full shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  Explorar Colección
                  <i className="mdi mdi-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </span>
              </Link>
            </div>

            {/* Indicadores de características */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/60">
              <div className="flex items-center gap-2">
                <i className="mdi mdi-shipping-fast text-lg"></i>
                <span className="text-sm">Envío Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="mdi mdi-shield-check text-lg"></i>
                <span className="text-sm">Garantía de Calidad</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="mdi mdi-heart text-lg"></i>
                <span className="text-sm">Hecho con Amor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60 animate-bounce">
            <span className="text-xs mb-2">Desliza hacia abajo</span>
            <i className="mdi mdi-chevron-down text-xl"></i>
          </div>
        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-semibold text-3xl leading-normal">Productos del Marketplace</h5>
            <div className="text-slate-500">
              Mostrando {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} de {total}{' '}
              productos
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fourth-base mx-auto mb-4"></div>
              <p>Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No se encontraron productos</p>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {products.map((item: any) => (
                  <div key={item.id} className="group">
                    <div className="relative overflow-hidden shadow rounded-md duration-500">
                      <Image
                        src={getImageUrl(item)}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-64 group-hover:scale-110 duration-500"
                      />
                      <div className="absolute -bottom-20 group-hover:bottom-3 left-3 right-3 duration-500">
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-full text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {'Agregar al Carrito'}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Botones flotantes */}
                      <ul className="list-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
                        <li>
                          <button
                            onClick={(e) => handleToggleFavorite(e, item)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 group/heart"
                          >
                            <Heart
                              className={`w-5 h-5 transition-all duration-200 group-hover/heart:scale-110 ${
                                isFavorite(item.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-gray-600 hover:text-red-400'
                              }`}
                            />
                          </button>
                        </li>
                        <li>
                          <Link
                            href={`/producto/${item.id}`}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-slate-900 hover:shadow-xl transition-all duration-200 group/eye"
                          >
                            <FiEye className="w-4 h-4 text-gray-600 group-hover/eye:text-white transition-colors duration-200" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-slate-900 hover:shadow-xl transition-all duration-200 group/bookmark"
                          >
                            <FiBookmark className="w-4 h-4 text-gray-600 group-hover/bookmark:text-white transition-colors duration-200" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Info del producto */}
                    <div className="mt-4">
                      <Link
                        href={`/producto/${item.id}`}
                        className="hover:text-fourth-base text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                      <div className="flex justify-between items-center mt-1">
                        <p className="font-medium">${item.price}</p>
                        <span className="text-sm text-slate-500">{item.store?.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINACIÓN */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  {/* Botón Anterior */}
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      page === 1
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4 mr-1" /> Anterior
                  </button>

                  {/* Números */}
                  {visiblePages.map((pageNumber, index) =>
                    pageNumber === '...' ? (
                      <span key={`dots-${index}`} className="px-3 py-2 text-slate-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber as number)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pageNumber === page
                            ? 'bg-fourth-base text-white'
                            : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  {/* Botón Siguiente */}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      page === totalPages
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                    }`}
                  >
                    Siguiente <FiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  Página {page} de {totalPages}
                </div>
              )}
            </>
          )}
        </div>

        <Cta />
        <Client />
      </section>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
