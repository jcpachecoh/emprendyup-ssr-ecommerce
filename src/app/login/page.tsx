'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message?.[0] || 'Credenciales inválidas');
      }

      const data = await res.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      // Try NextAuth signIn if available
      const mod = await import('next-auth/react').catch(() => null);
      const signIn = mod?.signIn as unknown as ((provider?: string) => void) | undefined;
      if (typeof signIn === 'function') {
        signIn('google');
        return;
      }
    } catch (err) {
      // continue to fallback
    }

    // Fallback: redirect to Google OAuth endpoint (requires server callback)
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
    if (clientId && redirectUri && typeof window !== 'undefined') {
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=profile%20email&prompt=select_account`;
      window.location.href = url;
      return;
    }

    setError('Google login no está configurado.');
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-fourth-base/10 via-blue-50 to-green-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full bg-white dark:bg-black">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center h-full">
            {/* Imagen lateral */}
            <div className="relative md:shrink-0 h-full">
              <Image
                src="/images/ab1.jpg"
                fill
                className="w-full h-full object-cover"
                alt="hombre en oficina"
              />
            </div>

            {/* Formulario */}
            <div className="p-8 lg:px-20 flex flex-col justify-center h-full min-h-screen md:min-h-full bg-black">
              <form onSubmit={handleSubmit} className="text-start lg:py-20 py-8">
                <h2 className="text-white text-xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      Correo electrónico:
                    </label>
                    <input
                      id="LoginEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded"
                      placeholder="nombre@gmail.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">
                      Contraseña:
                    </label>
                    <input
                      id="LoginPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded"
                      placeholder="********"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 mb-3">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-5 w-full bg-fourth-base text-black rounded-md"
                  >
                    {loading ? 'Ingresando...' : 'Login / Sign in'}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="mt-3 py-2 px-5 w-full border rounded-md bg-white text-black flex items-center justify-center gap-2"
                  >
                    {/* Google 'G' multicolor icon */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                      className="inline-block"
                    >
                      <path
                        fill="#4285F4"
                        d="M24 9.5c3.6 0 6.3 1.4 8.2 2.6l6-6C35.7 3 30.2 1 24 1 14.8 1 6.9 6 3 14.1l7 5.4C11.1 15.7 17 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.5 24c0-1.6-.1-2.8-.4-4H24v8.1h12.7c-.5 2.8-2 5.1-4.3 6.7l6.5 5C44.6 36.7 46.5 30.9 46.5 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10 33.5c1.4 2.8 4 5 7.1 6.3l5.1-6.7C20.5 31.5 18.5 30 16 29l-6 4.5z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 46.5c6.2 0 11.7-2 15.7-5.4l-6.5-5c-2 1.4-4.6 2.2-7.6 2.2-7 0-12.9-6.2-14.9-14.9l-7 5.4C6.9 42.5 14.8 46.5 24 46.5z"
                      />
                    </svg>
                    Entrar con Google
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-slate-400">¿No tienes una cuenta?</span>{' '}
                    <Link href="/registrarse" className="text-white font-bold">
                      Registrarse
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
