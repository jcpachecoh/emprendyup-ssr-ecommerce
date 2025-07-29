'use client';
import dynamic from 'next/dynamic';
const ProductListClient = dynamic(() => import('./ProductListClient'), { ssr: false });

export default function ProductListClientWrapper(props: {
  page: number;
  pageSize: number;
  gridClass?: string;
}) {
  return <ProductListClient {...props} />;
}
