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

  // Rutas que no deben mostrar navbar ni footer
  const authRoutes = ['/login', '/signup', '/olvido-contraseña', '/reset-password', '/registrarse'];
  const isAuthRoute = authRoutes.includes(pathname);

  // Only treat auth routes as special on desktop viewports.
  // This keeps the navbar/footer visible on mobile even for auth pages.
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const setFromMq = () => setIsDesktop(mq.matches);
    setFromMq();
    mq.addEventListener('change', setFromMq);
    return () => mq.removeEventListener('change', setFromMq);
  }, []);

  // If it's an auth route AND we're on desktop, render only the children (no chrome).
  if (isAuthRoute && isDesktop) {
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
