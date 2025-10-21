import React from 'react';
import { Metadata } from 'next';
import HerramientasClient from './components/HerramientasClient';

export const metadata: Metadata = {
  title: 'Herramientas para Emprendedores | EmprendyUp - Todo en Una Plataforma',
  description:
    'Suite completa de herramientas digitales para emprendedores. CRM, inventario, facturación, marketing y más. Todo integrado en una plataforma.',
  keywords:
    'herramientas emprendedores, CRM emprendedores, software negocio, gestión empresarial, plataforma integral',
  openGraph: {
    title: 'Herramientas para Emprendedores | EmprendyUp',
    description: 'Suite completa de herramientas digitales para hacer crecer tu negocio.',
    url: 'https://emprendyup.com/herramientas',
  },
};

export default function HerramientasPage() {
  return <HerramientasClient />;
}
