'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FiSearch, FiUser, FiSettings, FiLogOut } from '../../assets/icons/vander';

type NavbarSimpleProps = {
  navClass?: string;
  navlight: boolean;
};

export default function NavbarSimple({ navClass, navlight }: NavbarSimpleProps) {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [isToggle, setToggle] = useState<boolean>(false);
  const [menu, setmenu] = useState<string>('');
  const [submenu, setSubmenu] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const isScrolling = window.scrollY > 50;
        setScrolling(isScrolling);
      };

      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('#navigation') && !target.closest('.search-dropdown')) {
          setIsOpen(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('click', handleOutsideClick);

      let current = window.location.pathname;
      setmenu(current);
      setSubmenu(current);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  }, []);

  const toggleMenu = () => {
    setToggle(!isToggle);
  };

  return (
    <nav id="topnav" className={`${navClass} nav-sticky`}>
      <div className="container relative flex items-center justify-between gap-4">
        <Link className="logo flex items-center" href="/">
          <Image
            src="/images/logo.svg"
            width={48}
            height={48}
            className="h-12 w-12 min-w-[48px] min-h-[48px] object-contain"
            alt="EmprendyUp Logo"
            priority
          />
        </Link>

        {/* Menú de navegación principal */}
        <div className="flex items-center gap-4">
          <div id="navigation" style={{ display: isToggle === true ? 'block' : 'none' }}>
            <ul className={`navigation-menu ${navlight === true ? 'nav-light' : ''}`}>
              <li className={`${menu === '/' ? 'active' : ''}`}>
                <Link href="/" className="sub-menu-item" onClick={() => setToggle(false)}>
                  Inicio
                </Link>
              </li>

              <li
                className={`has-submenu parent-menu-item ${['/por-que-emprendy', '/crear-tienda', '/ventajas'].includes(menu) ? 'active' : ''}`}
              >
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSubmenu(submenu === '/beneficios-item' ? '' : '/beneficios-item');
                  }}
                >
                  Beneficios
                </Link>
                <span className="menu-arrow"></span>
                <ul className={`submenu ${submenu === '/beneficios-item' ? 'open' : ''}`}>
                  <li className={`ms-0 ${menu === '/por-que-emprendy' ? 'active' : ''}`}>
                    <Link
                      href="/por-que-emprendy"
                      className="sub-menu-item"
                      onClick={() => setToggle(false)}
                    >
                      ¿Por qué EmprendyUp?
                    </Link>
                  </li>
                  <li className={`ms-0 ${menu === '/crear-tienda' ? 'active' : ''}`}>
                    <Link
                      href="/crear-tienda"
                      className="sub-menu-item"
                      onClick={() => setToggle(false)}
                    >
                      Crear mi Tienda
                    </Link>
                  </li>
                  <li className={`ms-0 ${menu === '/ventajas' ? 'active' : ''}`}>
                    <Link
                      href="/ventajas"
                      className="sub-menu-item"
                      onClick={() => setToggle(false)}
                    >
                      Ventajas Competitivas
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <li
                className={`has-submenu parent-menu-item ${['/blog', '/blog-detalle', '/recursos'].includes(menu) ? 'active' : ''}`}
              >
                <Link
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSubmenu(submenu === '/blog-item' ? '' : '/blog-item');
                  }}
                >
                  Recursos
                </Link>
                <span className="menu-arrow"></span>
                <ul className={`submenu ${submenu === '/blog-item' ? 'open' : ''}`}>
                  <li className={`ms-0 ${menu === '/blog' ? 'active' : ''}`}>
                    <Link href="/blog" className="sub-menu-item">
                      Blog de Emprendimiento
                    </Link>
                  </li>
                  <li className={`ms-0 ${menu === '/recursos' ? 'active' : ''}`}>
                    <Link href="/recursos" className="sub-menu-item">
                      Guías y Recursos
                    </Link>
                  </li>
                  <li className={`ms-0 ${menu === '/casos-exito' ? 'active' : ''}`}>
                    <Link href="/casos-exito" className="sub-menu-item">
                      Casos de Éxito
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li className={`${menu === '/contact' ? 'active' : ''}`}>
                <Link href="/contacto" className="sub-menu-item" onClick={() => setToggle(false)}>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Botones de acción */}
          <ul className="buy-button list-none mb-0">
            {/* Buscador */}
            <li className="dropdown inline-block relative pe-1">
              <button
                data-dropdown-toggle="dropdown"
                className="dropdown-toggle align-middle inline-flex search-dropdown"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
              >
                {navlight === true ? (
                  <FiSearch className="size-5 text-white"></FiSearch>
                ) : (
                  <FiSearch className="size-5"></FiSearch>
                )}
              </button>
              {isOpen && (
                <div className="dropdown-menu absolute overflow-hidden end-0 m-0 mt-5 z-10 md:w-52 w-48 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                  <div className="relative">
                    <FiSearch className="absolute size-4 top-[9px] end-3"></FiSearch>
                    <input
                      type="text"
                      className="h-9 px-3 pe-10 w-full border-gray-100 dark:border-gray-800 focus:ring-0 outline-none bg-white dark:bg-slate-900"
                      name="s"
                      id="searchItem"
                      placeholder="Buscar recursos..."
                    />
                  </div>
                </div>
              )}
            </li>

            {/* Botón CTA principal */}
            <li className="inline-block ps-0.5">
              <Link
                href="/crear-tienda"
                className="py-2 px-4 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-sm font-medium text-center rounded-md bg-fourth-base hover:bg-fourth-base/90 text-white"
              >
                Crear Mi Tienda
              </Link>
            </li>

            {/* Login/Usuario */}
            <li className="inline-block ps-2">
              <Link
                href="/auth/login"
                className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-fourth-base text-slate-700 dark:text-white hover:text-fourth-base"
                title="Iniciar Sesión"
              >
                <FiUser className="h-4 w-4"></FiUser>
              </Link>
            </li>
          </ul>

          {/* Menú móvil toggle */}
          <div className="menu-extras">
            <div className="menu-item">
              <Link
                href="#"
                className={`navbar-toggle ${isToggle ? 'open' : ''}`}
                id="isToggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                }}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
