'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ShoppingCart,
  Users,
  Gift,
  Settings,
  Store,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useDashboardUIStore, useSessionStore } from '@/lib/store/dashboard';
import { getCurrentUser } from '@/lib/utils/rbac';

const navigation = [
  { name: 'Insights', href: '/dashboard/insights', icon: BarChart3 },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Bonuses', href: '/dashboard/bonuses', icon: Gift },
  { name: 'Store', href: '/dashboard/store', icon: Store },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const adminNavigation = [{ name: 'Admin', href: '/dashboard/admin', icon: User }];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, setUser, currentStore } = useSessionStore();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Estado para colapsar el sidebar en desktop
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para el menú móvil

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const allNavigation = [...navigation, ...(user?.role === 'admin' ? adminNavigation : [])];

  return (
    <div
      className={`h-screen bg-slate-900 dark:bg-gray-900 grid grid-rows-[auto_1fr] transition-all duration-300 
      ${collapsed ? 'lg:grid-cols-[96px_1fr]' : 'lg:grid-cols-[256px_1fr]'}`}
    >
      {/* Sidebar para desktop */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-50 ${
          collapsed ? 'w-24' : 'w-64'
        } bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          {/* Logo y botón para colapsar */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src="/images/logo.svg"
                width={48}
                height={48}
                className="h-12 w-12 min-w-[48px] min-h-[48px] object-contain"
                alt="EmprendyUp Logo"
                priority
              />
              {!collapsed && (
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  EmprendyUp
                </span>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-500"
            >
              {collapsed ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-4 space-y-1 items-center justify-center">
            {allNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setCollapsed(true)} // Colapsar el sidebar al hacer clic
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-fourth-base text-black'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon
                    className={`mr-0 pl-3 md:mr-3 h-8 w-8 ${
                      isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-75">
          <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Image
                  src="/images/logo.svg"
                  width={48}
                  height={48}
                  className="h-12 w-12 min-w-[48px] min-h-[48px] object-contain"
                  alt="EmprendyUp Logo"
                  priority
                />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  EmprendyUp
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 px-4 py-4 space-y-1">
              {allNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)} // Cerrar el menú al hacer clic
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-fourth-base text-black'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 grid grid-rows-[auto_1fr] min-h-screen">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left side: hamburguesa + fecha */}
            <div className="flex items-center space-x-4">
              {/* Botón hamburguesa solo en mobile */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8 auto-rows-max">{children}</div>
        </main>
      </div>
    </div>
  );
}
