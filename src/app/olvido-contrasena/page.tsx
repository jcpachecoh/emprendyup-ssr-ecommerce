'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import BackToHome from '../components/back-to-home';
import Switcher from '../components/switcher';
import { LoaderIcon } from 'lucide-react';

function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  // Email request state
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Email request submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(
          'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.'
        );
        setEmail('');
      } else {
        const data = await res.json();
        setError(data.message || 'Error al solicitar el restablecimiento.');
      }
    } catch (err) {
      setError('Error de red o servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Password reset submit
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    if (!newPassword || !confirmPassword) {
      setResetError('Por favor ingresa y confirma tu nueva contraseña.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Las contraseñas no coinciden.');
      return;
    }
    setResetLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      });
      if (res.ok) {
        setResetSuccess('¡Contraseña restablecida exitosamente!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        const data = await res.json();
        setResetError(data.message || 'Error al restablecer la contraseña.');
      }
    } catch (err) {
      setResetError('Error de red o servidor.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <section className="md:h-screen py-36 flex items-center bg-fourth-base/10 dark:bg-fourth-base/20 bg-[url('/images/hero/bg-shape.png')] bg-center bg-no-repeat bg-cover">
        <div className="container relative">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                <div className="relative md:shrink-0">
                  <Image
                    src="/images/forgot-password.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="lg:h-full h-full w-full object-cover md:h-[34rem]"
                    alt=""
                  />
                </div>
                <div className="p-8 lg:px-20">
                  <div className="text-center">
                    <Link href="/">
                      <Image
                        src="/images/logo-dark.png"
                        width={114}
                        height={22}
                        className="mx-auto block dark:hidden"
                        alt=""
                      />
                      <Image
                        src="/images/logo.svg"
                        width={114}
                        height={22}
                        className="mx-auto hidden dark:block"
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* Conditional rendering for token */}
                  {!token ? (
                    <form className="text-start lg:py-20 py-8" onSubmit={handleSubmit}>
                      <p className="text-slate-400 mb-6">
                        Por favor, ingresa tu dirección de correo electrónico para restablecer tu
                        contraseña.
                      </p>
                      <div className="grid grid-cols-1">
                        <div className="mb-4">
                          <label className="font-semibold" htmlFor="LoginEmail">
                            Correo Electrónico:
                          </label>
                          <input
                            id="LoginEmail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="nombre@gmail.com"
                            required
                          />
                        </div>
                        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
                        {success && <p className="text-green-500 mb-2 text-sm">{success}</p>}
                        <div className="mb-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                          >
                            {loading ? 'Enviando...' : 'Enviar'}
                          </button>
                        </div>
                        <div className="text-center">
                          <span className="text-slate-400 me-2">¿Recuerdas tu contraseña? </span>
                          <Link
                            href="/login"
                            className="text-black dark:text-white font-bold inline-block"
                          >
                            Iniciar sesión
                          </Link>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form className="text-start lg:py-20 py-8" onSubmit={handleResetSubmit}>
                      <h2 className="text-xl font-bold text-center text-black dark:text-white mb-6">
                        Restablecer contraseña
                      </h2>
                      <div className="grid grid-cols-1">
                        <div className="mb-4">
                          <label className="font-semibold" htmlFor="newPassword">
                            Nueva contraseña
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="********"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="font-semibold" htmlFor="confirmPassword">
                            Confirmar contraseña
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="********"
                            required
                          />
                        </div>
                        {resetError && <p className="text-red-500 mb-2 text-sm">{resetError}</p>}
                        {resetSuccess && (
                          <p className="text-green-500 mb-2 text-sm">{resetSuccess}</p>
                        )}
                        <div className="mb-4">
                          <button
                            type="submit"
                            disabled={resetLoading}
                            className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                          >
                            {resetLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
                          </button>
                        </div>
                        <div className="text-center">
                          <Link
                            href="/login"
                            className="text-black dark:text-white font-bold inline-block"
                          >
                            Iniciar sesión
                          </Link>
                        </div>
                      </div>
                    </form>
                  )}
                  <div className="text-center">
                    <p className="mb-0 text-slate-400">© {new Date().getFullYear()} EmprendyUp.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToHome />
      <Switcher />
    </>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoaderIcon />}>
      <ForgotPassword />
    </Suspense>
  );
}
