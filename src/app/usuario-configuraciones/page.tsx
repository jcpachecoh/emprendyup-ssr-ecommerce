import React from 'react';
import Link from 'next/link';

import Navbar from '../components/NavBar/navbar';
import Usertab from '../components/user-tab';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import {
  FiUser,
  FiUserCheck,
  FiMail,
  FiBookmark,
  FiMessageCircle,
  FiPhone,
  FiGlobe,
  FiKey,
} from '../assets/icons/vander';

export default function UserSetting() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={false} />

      <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
        <div className="md:container container-fluid relative">
          <div
            className={`relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-[url(/images/hero/pages.jpg)] bg-center bg-no-repeat bg-cover`}
          ></div>
        </div>

        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <Usertab />

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <h5 className="text-lg font-semibold mb-4">Información Personal :</h5>
                <form>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                      <label className="form-label font-medium">
                        Nombre : <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <FiUser className="w-4 h-4 absolute top-3 start-4"></FiUser>
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Nombre"
                          id="firstname"
                          name="name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">
                        Apellido : <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <FiUserCheck className="w-4 h-4 absolute top-3 start-4"></FiUserCheck>
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Apellido"
                          id="lastname"
                          name="name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">
                        Correo Electronico: <span className="text-red-600">*</span>
                      </label>
                      <div className="form-icon relative mt-2">
                        <FiMail className="w-4 h-4 absolute top-3 start-4"></FiMail>
                        <input
                          type="email"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Correo Electronico"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-medium">Ocupación: </label>
                      <div className="form-icon relative mt-2">
                        <FiBookmark className="w-4 h-4 absolute top-3 start-4"></FiBookmark>
                        <input
                          name="name"
                          id="occupation"
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Ocupación"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="mt-5">
                      <label className="form-label font-medium">Descripción: </label>
                      <div className="form-icon relative mt-2">
                        <FiMessageCircle className="w-4 h-4 absolute top-3 start-4"></FiMessageCircle>
                        <textarea
                          name="comments"
                          id="comments"
                          className="ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Descripción aquí"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    id="submit"
                    name="send"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md mt-5"
                    value="Guardar Cambios"
                  />
                </form>
              </div>

              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                  <div>
                    <h5 className="text-lg font-semibold mb-4">Información de contacto:</h5>

                    <form>
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label className="form-label font-medium">Teléfono:</label>
                          <div className="form-icon relative mt-2">
                            <FiPhone className="w-4 h-4 absolute top-3 start-4"></FiPhone>
                            <input
                              name="number"
                              id="number"
                              type="number"
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="Numero"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-medium">Sitio Web:</label>
                          <div className="form-icon relative mt-2">
                            <FiGlobe className="w-4 h-4 absolute top-3 start-4"></FiGlobe>
                            <input
                              name="url"
                              id="url"
                              type="url"
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="Url "
                            />
                          </div>
                        </div>
                      </div>

                      <button className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md mt-5">
                        Añadir
                      </button>
                    </form>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold mb-4">Cambiar contraseña:</h5>
                    <form>
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label className="form-label font-medium">Contraseña anterior:</label>
                          <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4"></FiKey>
                            <input
                              type="password"
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="*********"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-medium">Nueva contraseña:</label>
                          <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4"></FiKey>
                            <input
                              type="password"
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="*********"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="form-label font-medium">
                            Confirmar nueva contraseña:
                          </label>
                          <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4"></FiKey>
                            <input
                              type="password"
                              className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                              placeholder="*********"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md mt-5">
                        Guardar contraseña
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <h5 className="text-lg font-semibold mb-5 text-red-600">Eliminar cuenta:</h5>

                <p className="text-slate-400 mb-4">
                  ¿Quieres eliminar la cuenta? Por favor presiona el botón de eliminar a
                  continuación.
                </p>

                <Link
                  href="/"
                  className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-600 text-white rounded-md"
                >
                  Borrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Switcher />
      <ScrollToTop />
    </>
  );
}
