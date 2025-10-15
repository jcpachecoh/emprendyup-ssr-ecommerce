'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiEye, FiBookmark, FiTrash2 } from '../assets/icons/vander';
import { Product } from '../utils/types';

export default function FavoritesGridClient() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = localStorage.getItem('favorites');
      if (favs) {
        try {
          setFavorites(JSON.parse(favs));
        } catch {
          setFavorites([]);
        }
      }
    }
  }, []);
  const getImageUrl = (item: Product) => {
    const imageKey = item?.images?.[0]?.url;
    return imageKey
      ? `https://emprendyup-images.s3.us-east-1.amazonaws.com/${imageKey}`
      : '/assets/default-product.jpg';
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav.id !== itemId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (e) {
      console.error('Error removing from favorites:', e);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <FiHeart className="size-16 mx-auto text-slate-300 mb-4" />
        <p className="text-xl text-slate-500 mb-2">No tienes productos favoritos guardados</p>
        <p className="text-slate-400 mb-6">Explora nuestros productos y añade tus favoritos</p>
        <Link
          href="/marketplace"
          className="py-3 px-6 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 dark:bg-slate-800 text-white rounded-md shadow dark:shadow-gray-700 hover:bg-fourth-base"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((item: Product) => (
        <div className="group relative duration-500 w-full mx-auto" key={item.id}>
          <div className="flex flex-col items-center">
            <div
              className="relative overflow-hidden w-full shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500"
              style={{ height: '320px' }}
            >
              <Image
                className="w-full h-full object-cover rounded-md group-hover:scale-110 duration-500"
                src={getImageUrl(item)}
                width={320}
                height={320}
                alt={item.title}
              />
              <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                <li>
                  <button
                    className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow"
                    onClick={() => handleRemoveFromFavorites(item.id)}
                    title="Eliminar de favoritos"
                  >
                    <FiTrash2 className="size-4" />
                  </button>
                </li>
                <li className="mt-1 ms-0">
                  <Link
                    href={`/producto/${item.id}`}
                    className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                  >
                    <FiEye className="size-4" />
                  </Link>
                </li>
              </ul>

              {/* Badge de favorito */}
              <div className="absolute top-[10px] start-4">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FiHeart className="size-3 fill-current" />
                  Favorito
                </span>
              </div>
              <button
                onClick={() => handleRemoveFromFavorites(item.id)}
                className="py-2 px-4 inline-block font-semibold tracking-wide align-middle duration-500 text-sm text-center bg-red-100 text-red-600 rounded-md shadow hover:bg-red-500 hover:text-white"
              >
                Quitar
              </button>
            </div>

            <div className="w-full mt-4 text-center">
              <Link
                href={`/producto/${item.id}`}
                className="hover:text-fourth-base text-lg font-medium block"
              >
                {item.title}
              </Link>
              <p className="text-slate-400 line-clamp-1 mt-2">{item.description}</p>

              <p className="mt-2 font-semibold">
                {item.price} {item.currency}
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <Link
                  href="/shop-cart"
                  className="py-2 px-4 inline-block font-semibold tracking-wide align-middle duration-500 text-sm text-center bg-slate-900 dark:bg-slate-800 text-white rounded-md shadow dark:shadow-gray-700 hover:bg-fourth-base"
                >
                  Añadir al carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
