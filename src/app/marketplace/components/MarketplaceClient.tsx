'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import {
  FiHeart,
  FiEye,
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
} from '../../assets/icons/vander';
import Cta from '../../components/cta';
import Client from '../../components/client';
import Switcher from '../../components/switcher';
import ScrollToTop from '../../components/scroll-to-top';
import toast from 'react-hot-toast';
import { Heart, ShoppingCart } from 'lucide-react';
import { cartService } from '@/lib/Cart';
import ProductListClientWrapper from '../../components/ProductListClientWrapper';

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
}

export default function MarketplaceClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error, refetch } = useQuery(PAGINATED_PRODUCTS_QUERY, {
    variables: { page: currentPage, pageSize: 20 },
  });

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const productsData = data?.paginatedProducts;
  const products = productsData?.items || [];
  const total = productsData?.total || 0;
  const page = productsData?.page || 1;
  const pageSize = productsData?.pageSize || 20;
  const totalPages = Math.ceil(total / pageSize);

  const generatePagination = (page: number, totalPages: number) => {
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

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative table w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-rose-900 to-purple-900 overflow-hidden">
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fourth-base/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-fourth-base/5 to-transparent animate-spin-slow"></div>
        </div>

        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-fourth-base/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-6">
          <div className="text-center">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-fourth-base/20 backdrop-blur-sm border border-fourth-base/30 rounded-full text-fourth-base text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-fourth-base rounded-full animate-ping"></span>
              Nueva Colección Disponible
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
          <ProductListClientWrapper page={1} pageSize={20} />
        </div>

        <Cta />
        <Client />
      </section>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
