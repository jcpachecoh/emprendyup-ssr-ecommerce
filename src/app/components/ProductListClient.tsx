'use client';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiEye, FiBookmark, FiChevronLeft, FiChevronRight } from '../assets/icons/vander';
import { Product } from '../utils/types';
import { cartService } from '@/lib/Cart';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

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

export default function ProductListClient({
  page = 1,
  pageSize = 50,
  gridClass = 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8',
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const { data, loading, error } = useQuery(PAGINATED_PRODUCTS_QUERY, {
    variables: { page: currentPage, pageSize },
  });
  const [isLoading, setIsLoading] = useState(false);
  if (loading) return <div className="text-center py-10">Cargando productos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  const products = data?.paginatedProducts?.items || [];
  const total = data?.paginatedProducts?.total || 0;
  const pageSizeVal = data?.paginatedProducts?.pageSize || pageSize;
  const totalPages = Math.ceil(total / pageSizeVal);

  const handleAddToFavorites = (item: Product) => {
    console.log(`Add to favorites: ${item.title}`);
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.some((fav: Product) => fav.id === item.id)) {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } catch (e) {
      console.error('Error saving to favorites:', e);
    }
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

  const getImageUrl = (item: Product) => {
    const imageKey = item?.images?.[0]?.url;
    const imageUrl = imageKey
      ? `https://emprendyup-images.s3.us-east-1.amazonaws.com/${imageKey}`
      : '/assets/default-product.jpg';
    return imageUrl;
  };

  return (
    <>
      <div className={gridClass}>
        {products.map((item: Product) => (
          <div className="group relative duration-500 w-full h-full" key={item.id}>
            <div className="flex flex-col items-center h-full rounded-xl overflow-hidden  dark:bg-slate-800 shadow-md hover:shadow-2xl transition-shadow duration-300">
              {/* Image Container */}
              <div
                className="relative overflow-hidden w-full bg-gray-100 dark:bg-gray-700"
                style={{ height: '280px' }}
              >
                <Image
                  className="w-full h-full object-cover group-hover:scale-110 duration-500"
                  src={getImageUrl(item)}
                  width={280}
                  height={210}
                  alt={item.title || 'Placeholder Image'}
                  loading="lazy"
                />

                {/* Action Buttons - Top Right */}
                <ul className="list-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 duration-500 space-y-2 flex flex-col">
                  <li>
                    <button
                      className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-300 text-center rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white shadow-lg hover:scale-110"
                      onClick={() => handleAddToFavorites(item)}
                    >
                      <FiHeart className="size-5" />
                    </button>
                  </li>
                  <li>
                    <Link
                      href={`/producto/${item.id}`}
                      className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-300 text-center rounded-full bg-white text-slate-900 hover:bg-blue-500 hover:text-white shadow-lg hover:scale-110"
                    >
                      <FiEye className="size-5" />
                    </Link>
                  </li>
                </ul>

                {/* Availability Badge */}
                {!item.available && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Agotado
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="w-full px-5 py-5 flex flex-col flex-grow">
                <Link
                  href={`/producto/${item.id}`}
                  className="hover:text-blue-500 text-lg font-bold block text-slate-900 dark:text-white line-clamp-2 transition-colors"
                >
                  {item.title}
                </Link>

                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2 flex-grow">
                  {item.description}
                </p>

                {/* Price */}
                <div className="mt-3 mb-4">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.price} <span className="text-sm text-slate-500">{item.currency}</span>
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="w-full text-white py-2 px-4 bg-fourth-base rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 mb-8">
        <nav aria-label="Page navigation" className="flex justify-center">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-fourth-base dark:hover:border-fourth-base hover:bg-fourth-base dark:hover:bg-fourth-base"
              >
                <FiChevronLeft className="size-5 rtl:rotate-180 rtl:-mt-1" />
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`size-[40px] inline-flex justify-center items-center border border-gray-100 dark:border-gray-800 ${currentPage === i + 1 ? 'bg-fourth-base text-white z-10 border-fourth-base' : 'text-slate-400 bg-white dark:bg-slate-900 hover:text-white hover:border-fourth-base hover:bg-fourth-base dark:hover:border-fourth-base dark:hover:bg-fourth-base'}`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-fourth-base dark:hover:border-fourth-base hover:bg-fourth-base dark:hover:bg-fourth-base"
              >
                <FiChevronRight className="size-5 rtl:rotate-180 rtl:-mt-1" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
