'use client';
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
