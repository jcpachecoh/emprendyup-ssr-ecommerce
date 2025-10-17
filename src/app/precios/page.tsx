import { Metadata } from 'next';
import PricingClient from './components/PricingClient';

export const metadata: Metadata = {
  title: 'Precios EmprendyUp | Planes Accesibles para Emprendedores',
  description:
    'Planes de precios transparentes y accesibles para emprendedores. Sin comisiones por venta, solo un precio fijo mensual. ¡Conoce nuestros planes!',
  keywords:
    'precios emprendyup, planes emprendedores, suscripción ecommerce, sin comisiones, precio fijo',
  openGraph: {
    title: 'Precios EmprendyUp | Planes para Emprendedores',
    description: 'Planes transparentes sin comisiones. Solo pagas un precio fijo mensual.',
    url: 'https://emprendyup.com/precios',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios EmprendyUp | Planes para Emprendedores',
    description: 'Planes transparentes sin comisiones. Solo pagas un precio fijo mensual.',
  },
};

export default function PreciosPage() {
  return <PricingClient />;
}
