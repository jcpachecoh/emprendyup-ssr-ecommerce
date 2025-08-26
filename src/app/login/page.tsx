import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-fourth-base/10 via-blue-50 to-green-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 bg-[url(/images/hero/bg-shape.png)] bg-center bg-no-repeat bg-cover">
      <div className="w-full h-full flex items-center justify-center p-0 m-0">
        <div className="w-full h-full">
          <div className="w-full h-full bg-white dark:bg-black">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center h-full">
              <div className="relative md:shrink-0 h-full">
                <Image
                  src="/images/ab1.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%' }}
                  className="w-full h-full object-cover"
                  alt="hombre en oficina"
                />
              </div>

              <div className="p-8 lg:px-20 flex flex-col justify-center h-full min-h-screen md:min-h-full bg-black">
                <div className="text-center">
                  <Link href="/">
                    <Image
                      src="/images/logo.svg"
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
                  <Link
                    href="/"
                    className="text-sm text-slate-500 hover:text-fourth-base transition-colors duration-300 mt-2 inline-block"
                  >
                    ← Volver al inicio
                  </Link>
                </div>

                <form className="text-start lg:py-20 py-8">
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginEmail">
                        Correo electrónico:
                      </label>
                      <input
                        id="LoginEmail"
                        type="email"
                        className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                        placeholder="nombre@gmail.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginPassword">
                        Contraseña:
                      </label>
                      <input
                        id="LoginPassword"
                        type="password"
                        className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                        placeholder="********"
                      />
                    </div>

                    <div className="flex justify-between mb-4">
                      <div className="flex items-center mb-0">
                        <input
                          className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          type="checkbox"
                          value=""
                          id="Recordarme"
                        />
                        <label className="form-checkbox-label text-slate-400" htmlFor="Recordarme">
                          Recordar
                        </label>
                      </div>
                      <p className="text-slate-400 mb-0">
                        <Link href="/olvido-contraseña" className="text-slate-400">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </p>
                    </div>

                    <div className="mb-4">
                      <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                        value="Login / Sign in"
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">¿No tienes una cuenta?</span>{' '}
                      <Link
                        href="/registrarse"
                        className="text-white dark:text-white font-bold inline-block"
                      >
                        Registrarse
                      </Link>
                    </div>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-0 text-slate-400">© {new Date().getFullYear()} EmprendyUp. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
