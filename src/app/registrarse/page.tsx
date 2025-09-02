'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Helper to attempt NextAuth signIn dynamically
async function tryNextAuthSignIn(provider: string) {
  try {
    // dynamic import to avoid bundling requirement
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nextAuth = await import('next-auth/react');
    if (nextAuth?.signIn) {
      // @ts-ignore
      return nextAuth.signIn(provider);
    }
  } catch (e) {
    return null;
  }
}

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeId, setStoreId] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Debes aceptar los Términos y Condiciones.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message?.[0] || 'Error en el registro');
      }

      const data = await res.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    // Try NextAuth if available
    const res = await tryNextAuthSignIn('google');
    if (res !== null) return;

    // Fallback: redirect to Google's OAuth 2.0 endpoint
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri =
      process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI ||
      `${window.location.origin}/api/auth/google/callback`;
    if (!clientId) {
      setError('Google OAuth no está configurado. Falta NEXT_PUBLIC_GOOGLE_CLIENT_ID.');
      return;
    }

    const scope = encodeURIComponent('profile email');
    const state = encodeURIComponent(JSON.stringify({ from: 'signup' }));
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}&state=${state}&prompt=select_account`;

    window.location.href = oauthUrl;
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
                alt="signup"
              />
            </div>

            {/* Formulario */}
            <div className="p-8 lg:px-20 flex flex-col justify-center h-full min-h-screen md:min-h-full bg-black">
              <form onSubmit={handleSubmit} className="text-start lg:py-20 py-8">
                <h2 className="text-white text-xl font-bold mb-6 text-center">Registro</h2>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterName">
                      Nombre:
                    </label>
                    <input
                      id="RegisterName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterEmail">
                      Correo Electrónico:
                    </label>
                    <input
                      id="RegisterEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterPassword">
                      Contraseña:
                    </label>
                    <input
                      id="RegisterPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="AcceptT&C"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="form-checkbox me-2"
                    />
                    <label htmlFor="AcceptT&C" className="text-slate-400">
                      Acepto los{' '}
                      <Link href="/terminos" className="text-fourth-base">
                        Términos y Condiciones
                      </Link>
                    </label>
                  </div>

                  {error && <p className="text-red-500 mb-3">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-5 w-full bg-fourth-base text-black rounded-md"
                  >
                    {loading ? 'Registrando...' : 'Registrar'}
                  </button>
                  <div className="py-4 text-center">o</div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="py-2 px-5 w-full border border-gray-200 text-black bg-white rounded-md flex items-center justify-center gap-2"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.35 11.1H12v2.9h5.35c-.23 1.24-1.1 2.29-2.35 2.95v2.45h3.8c2.22-2.04 3.5-5.06 3.5-8.9 0-.6-.06-1.18-.17-1.75z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.8-2.45c-1.06.7-2.42 1.12-4.83 1.12-3.72 0-6.86-2.5-7.98-5.88H.82v2.66C2.48 19.98 7.76 22 12 22z"
                          fill="#34A853"
                        />
                        <path
                          d="M4.02 13.34A7.01 7.01 0 014 12c0-.66.1-1.3.28-1.92V7.42H.82A11.99 11.99 0 000 12c0 1.92.44 3.74 1.22 5.36l2.8-4.02z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 6.48c1.47 0 2.8.5 3.84 1.48l2.86-2.86C16.95 3.6 14.68 3 12 3 7.76 3 2.48 5.02.82 7.92l3.46 2.66C5.14 8.98 8.28 6.48 12 6.48z"
                          fill="#EA4335"
                        />
                      </svg>
                      Regístrate con Google
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-slate-400">¿Ya tienes una cuenta?</span>{' '}
                    <Link href="/login" className="text-white font-bold">
                      Inicia sesión
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
