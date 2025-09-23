'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // Check if user has a valid session
        if (!user || !user.email || !user.name) {
          // No valid session, redirect to index
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push('/');
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        // Invalid JSON in localStorage, redirect to index
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
}
