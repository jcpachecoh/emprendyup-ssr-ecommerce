import React from 'react';
import { Metadata } from 'next';
import FeriasEmprendedoresClient from './components/FeriasEmprendedoresClient';

export const metadata: Metadata = {
  title: 'Ferias de Emprendedores | EmprendyUp - Conecta y Vende',
  description:
    'Participa en ferias virtuales de emprendedores. Conecta con clientes, exhibe productos y aumenta ventas. Red de emprendedores colombianos.',
  keywords:
    'ferias emprendedores, ferias virtuales, red emprendedores, exhibir productos, ventas online',
  openGraph: {
    title: 'Ferias de Emprendedores | EmprendyUp',
    description: 'Conecta con miles de clientes en ferias virtuales de emprendedores.',
    url: 'https://emprendyup.com/ferias-emprendedores',
  },
};

export default function FeriasEmprendedoresPage() {
  return <FeriasEmprendedoresClient />;
}
