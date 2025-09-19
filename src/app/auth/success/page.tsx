'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if user has a valid session
    if (!user || !user.email || !user.name || user.role !== 'ADMIN') {
      // No valid session, redirect to index
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      if (user?.storeId) {
        router.push('/dashboard/insights');
      } else {
        router.push('/dashboard/store/new');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">¡Inicio de sesión exitoso!</h1>
        <p className="text-green-600">Redirigiendo al dashboard...</p>
      </div>
    </div>
  );
}
