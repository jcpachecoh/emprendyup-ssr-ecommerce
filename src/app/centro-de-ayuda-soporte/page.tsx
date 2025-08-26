import React from 'react';
import Link from 'next/link';

import Navbar from '../components/NavBar/navbar';
import FaqAbout from '../components/faq-about';
import Footer from '../components/footer';
import Switcher from '../components/switcher';

import { FiUser, FiMail, FiBook, FiMessageCircle } from '../assets/icons/vander';
import ScrollToTop from '../components/scroll-to-top';

export default function HelpcenterSupport() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={true} />
      <section className="relative table w-full py-36 bg-[url('/images/hero/pages.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
              Envíanos tu consulta
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href="/">EmprendyUp</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href="/helpcenter">Centro de Ayuda</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              Soporte
            </li>
          </ul>
        </div>
      </section>
      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container relative md:pb-24 pb-16">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-6 mx-auto text-center">
            <div className="lg:col-start-3 lg:col-span-8 md:col-start-2 md:col-span-10">
              <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6">
                <form>
                  <div className="grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-6 mb-5">
                      <div className="text-start">
                        <label htmlFor="name" className="font-semibold">
                          Tu Nombre:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiUser className="size-4 absolute top-3 start-4"></FiUser>
                          <input
                            name="name"
                            id="name"
                            type="text"
                            className="ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="Nombre"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 mb-5">
                      <div className="text-start">
                        <label htmlFor="email" className="font-semibold">
                          Correo Electrónico:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiMail className="size-4 absolute top-3 start-4"></FiMail>
                          <input
                            name="email"
                            id="email"
                            type="email"
                            className="ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="nombre@gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="mb-5">
                      <div className="text-start">
                        <label htmlFor="subject" className="font-semibold">
                          Pregunta o Tema:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiBook className="size-4 absolute top-3 start-4"></FiBook>
                          <input
                            name="subject"
                            id="subject"
                            className="ps-11 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="Pregunta o Tema "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-start">
                        <label htmlFor="comments" className="font-semibold">
                          Comentario:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiMessageCircle className="size-4 absolute top-3 start-4"></FiMessageCircle>
                          <textarea
                            name="comments"
                            id="comments"
                            className="ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder=".... "
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-fourth-base hover:bg-fourth-100 border-fourth-base hover:border-fourth-100 text-white rounded-md justify-center flex items-center"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <FaqAbout />
      </section>
      <Footer />
      <Switcher />
      <ScrollToTop />
    </>
  );
}
