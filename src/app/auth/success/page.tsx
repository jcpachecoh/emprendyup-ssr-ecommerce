'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    // You can add any success logic here
    // Store user data, show success message, etc.

    // Then redirect to dashboard
    const timer = setTimeout(() => {
      router.push('/dashboard/insights');
    }, 2000); // Wait 2 seconds to show success message

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
