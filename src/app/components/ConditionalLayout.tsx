'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavbarSimple from './NavBar/NavBarSimple';
import EnhancedFooter from './EnhancedFooter';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  useEffect(() => {
    // Rutas que no deben mostrar navbar ni footer
    const authRoutes = [
      '/login',
      '/signup',
      '/olvido-contraseña',
      '/reset-password',
      '/registrarse',
      '/dashboard/insights',
      '/dashboard/bonuses',
      '/dashboard/customers',
      '/dashboard/orders',
      '/dashboard/store',
      '/dashboard/settings',
      '/dashboard/admin',
      '/dashboard/store/settings',
      '/dashboard/store/new',
      '/dashboard/blog/new',
      '/dashboard/blog/edit/[slug]',
      '/dashboard/blog',
      '/dashboard/store/products',
      '/dashboard/store/products/new',
    ];
    setIsAuthRoute(authRoutes.includes(pathname));
  }, [pathname]);

  // Si la ruta pertenece a `authRoutes`, no renderizar el navbar ni el footer
  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarSimple navClass="defaultscroll is-sticky tagline-height" navlight={false} />
      {children}
      <footer aria-label="Pie de página con información de contacto">
        <EnhancedFooter />
      </footer>
    </>
  );
}
