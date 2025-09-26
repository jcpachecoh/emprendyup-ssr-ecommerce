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
      '/dashboard/users',
      '/dashboard/store/list',
      '/dashboard/store/new',
      '/dashboard/stores',
      '/dashboard/blog/new',
      '/dashboard/blog',
      '/dashboard/store/products',
      '/dashboard/store/products/new',
    ];

    const dynamicAuthRoutes = [
      /^\/dashboard\/stores\/settings\/[^/]+$/,
      /^\/dashboard\/blog\/edit\/[^/]+$/,
    ];

    const isStatic = authRoutes.includes(pathname);
    const isDynamic = dynamicAuthRoutes.some((regex) => regex.test(pathname));

    setIsAuthRoute(isStatic || isDynamic);
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
