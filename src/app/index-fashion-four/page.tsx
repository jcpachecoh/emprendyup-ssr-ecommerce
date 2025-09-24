'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';

import { FiHeart, FiEye, FiBookmark, FiChevronLeft, FiChevronRight } from '../assets/icons/vander';
import Cta from '../components/cta';
import Client from '../components/client';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

const GET_MARKETPLACE_PRODUCTS = gql`
  query GetMarketplaceProducts($page: Int!, $pageSize: Int!) {
    marketplaceProducts(page: $page, pageSize: $pageSize) {
      items {
        id
        name
        price
        description
        imageUrl
        store {
          id
          name
        }
      }
      total
      page
      pageSize
    }
  }
`;

export default function IndexFour() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, loading, error } = useQuery(GET_MARKETPLACE_PRODUCTS, {
    variables: { page: currentPage, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <p className="text-center py-10 text-red-500">Error al cargar productos</p>;

  const products = data?.marketplaceProducts?.items || [];
  const total = data?.marketplaceProducts?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  // Función para cambiar página
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba al cambiar página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para generar números de página visibles
  const getVisiblePages = () => {
    const delta = 2; // Número de páginas a mostrar a cada lado de la página actual
    const range = [];
    const rangeWithDots = [];

    // Calcular el rango de páginas a mostrar
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Agregar primera página y puntos suspensivos si es necesario
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    // Agregar páginas del rango
    rangeWithDots.push(...range);

    // Agregar puntos suspensivos y última página si es necesario
    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <>
      {/* HERO */}
      <section className="relative md:flex table w-full items-center md:h-screen py-36 bg-[url('/images/hero/bg4.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-t to-transparent via-slate-900/50 from-slate-900/90"></div>
        <div className="container relative text-center">
          <span className="uppercase font-semibold text-lg text-white">Top Collection</span>
          <h4 className="md:text-6xl text-4xl font-bold text-white my-3">Shine Bright</h4>
          <p className="text-lg text-white/70">Our latest collection of essential basics.</p>
          <div className="mt-6">
            <Link
              href="#"
              className="py-2 px-5 inline-block font-semibold bg-white text-fourth-base rounded-md"
            >
              Shop Now <i className="mdi mdi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-semibold text-3xl leading-normal">Productos del Marketplace</h5>
            <div className="text-slate-500">
              Mostrando {(currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(currentPage * pageSize, total)} de {total} productos
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
                        src={item.imageUrl || '/images/placeholder.png'}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-64 group-hover:scale-110 duration-500"
                      />

                      <div className="absolute -bottom-20 group-hover:bottom-3 left-3 right-3 duration-500">
                        <Link
                          href="/shop-cart"
                          className="py-2 px-5 inline-block font-semibold bg-slate-900 text-white w-full rounded-md text-center"
                        >
                          Añadir al carrito
                        </Link>
                      </div>

                      <ul className="list-none absolute top-[10px] right-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                        <li>
                          <Link
                            href="#"
                            className="size-10 inline-flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                          >
                            <FiHeart className="size-4" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/product-detail-one/${item.id}`}
                            className="size-10 inline-flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                          >
                            <FiEye className="size-4" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="size-10 inline-flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                          >
                            <FiBookmark className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/product-detail-one/${item.id}`}
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </button>

                  {/* Números de página */}
                  {visiblePages.map((page, index) => {
                    if (page === '...') {
                      return (
                        <span key={`dots-${index}`} className="px-3 py-2 text-slate-500">
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-fourth-base text-white'
                            : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Botón Siguiente */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-700 hover:text-fourth-base hover:bg-slate-100'
                    }`}
                  >
                    Siguiente
                    <FiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {/* Información adicional de paginación */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  Página {currentPage} de {totalPages}
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
