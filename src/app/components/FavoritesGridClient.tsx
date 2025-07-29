'use client';
import { useEffect, useState } from 'react';
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

  if (favorites.length === 0) {
    return <p className="text-lg">No tienes productos favoritos guardados.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {favorites.map((item, idx) => (
        <div key={idx} className="bg-white rounded shadow p-4 flex flex-col items-center">
          <img
            src={item.imageUrl || item.imageUrl || ''}
            alt={item.title || item.title || ''}
            className="w-32 h-32 object-cover rounded mb-2"
          />
          <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
          <p className="text-slate-500 mb-1">{item.description || ''}</p>
          <p className="font-bold mb-1">
            {item.price ? `${item.price} ${item.currency || ''}` : ''}
          </p>
        </div>
      ))}
    </div>
  );
}
