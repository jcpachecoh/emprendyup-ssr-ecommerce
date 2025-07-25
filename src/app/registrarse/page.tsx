import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import BackToHome from '../components/back-to-home';
import Switcher from '../components/switcher';

export default function Signup() {
  return (
    <>
      <section className="md:h-screen py-36 flex items-center bg-fourth-base/10 dark:bg-fourth-base/20 bg-[url('/images/hero/bg-shape.png')] bg-center bg-no-repeat bg-cover">
        <div className="container relative">
          <div className="grid grid-cols-1">
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
              <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                <div className="relative md:shrink-0">
                  <Image
                    src="/images/signup.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="h-full w-full object-cover md:h-[44rem]"
                    alt=""
                  />
                </div>

                <div className="p-8 lg:px-20">
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
                  </div>

                  <form className="text-start lg:py-20 py-8">
                    <div className="grid grid-cols-1">
                      <div className="mb-4">
                        <label className="font-semibold" htmlFor="RegisterName">
                          Nombre:
                        </label>
                        <input
                          id="RegisterName"
                          type="text"
                          className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Harry"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="font-semibold" htmlFor="LoginEmail">
                          Correo Electrónico:
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

                      <div className="mb-4">
                        <div className="flex items-center w-full mb-0">
                          <input
                            className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                            type="checkbox"
                            value=""
                            id="AcceptT&C"
                          />
                          <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">
                            Acepto{' '}
                            <Link href="" className="text-fourth-base">
                              Términos y Condiciones
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <button
                          type="submit"
                          className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                        >
                          <Link href="/signup-success">Registrar</Link>
                        </button>
                      </div>

                      <div className="text-center">
                        <span className="text-slate-400 me-2">¿Ya tienes una cuenta? </span>{' '}
                        <Link
                          href="/login"
                          className="text-black dark:text-white font-bold inline-block"
                        >
                          Iniciar sesión
                        </Link>
                      </div>
                    </div>
                  </form>

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
