'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import BackToHome from '../components/back-to-home';
import Switcher from '../components/switcher';

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeId, setStoreId] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Handle OAuth errors from URL params
  useEffect(() => {
    const oauthError = searchParams.get('error');
    const message = searchParams.get('message');

    if (oauthError) {
      const errorMessages = {
        oauth_cancelled: 'Has cancelado el registro con Google.',
        no_authorization_code: 'Error de autorización con Google.',
        oauth_not_configured: 'Google OAuth no está configurado correctamente.',
        token_exchange_failed: 'Error al intercambiar el token de Google.',
        profile_fetch_failed: 'Error al obtener tu perfil de Google.',
        backend_not_configured: 'Backend no configurado.',
        backend_auth_failed: 'Error de autenticación en el servidor.',
        unexpected_error: 'Error inesperado durante el registro con Google.',
        no_account_found: message || 'No tienes una cuenta. Por favor regístrate primero.',
      };
      setError(errorMessages[oauthError as keyof typeof errorMessages] || 'Error desconocido');

      // Clear the error from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.delete('message');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowToast(false);

    if (!acceptTerms) {
      setError('Debes aceptar los Términos y Condiciones.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          ...(storeId && storeId.trim() !== '' && { storeId }), // Only include storeId if it has a value
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error en el registro');
      }

      const data = await res.json();

      // Show toast message
      setShowToast(true);

      // Hide toast and redirect after delay (form stays filled until redirect)
      setTimeout(() => {
        setShowToast(false);

        // Clear form just before redirecting
        setName('');
        setEmail('');
        setPassword('');
        setStoreId('');
        setAcceptTerms(false);

        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    // Clear any existing errors
    setError('');

    // Check if Google OAuth is configured
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Google OAuth no está configurado. Contacta al administrador.');
      return;
    }

    // Redirect directly to Google's OAuth 2.0 endpoint using the original callback
    const redirectUri = `${window.location.origin}/api/auth/google/callback`;
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
                    <label className="font-semibold text-white" htmlFor="RegisterName">
                      Nombre:
                    </label>
                    <input
                      id="RegisterName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold text-white" htmlFor="RegisterEmail">
                      Correo Electrónico:
                    </label>
                    <input
                      id="RegisterEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold text-white" htmlFor="RegisterPassword">
                      Contraseña:
                    </label>
                    <input
                      id="RegisterPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent border rounded text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center">
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
      <BackToHome />
      <Switcher />

      {/* Toast Success Message */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-500 ease-in-out">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium">¡Registro exitoso!</p>
              <p className="text-sm text-green-100">
                Serás redirigido al login en unos momentos...
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 ml-2 text-green-200 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
