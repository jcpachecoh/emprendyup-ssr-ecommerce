import React from 'react';
import Image from 'next/image';

import Navbar from '../components/NavBar/navbar';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import { FiPhone, FiMail, FiMapPin } from '../assets/icons/vander';
import ContactModal from '../components/contact-modal';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <section className="relative table w-full py-36">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
            <div className="lg:col-span-7 md:col-span-6">
              <Image
                src="/images/contact.svg"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                alt="Contacto EmprendyUp"
              />
            </div>

            <div className="lg:col-span-5 md:col-span-6">
              <div className="lg:ms-5">
                <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                  <h3 className="mb-6 text-2xl leading-normal font-semibold">
                    ¡Ponte en contacto!
                  </h3>

                  <form>
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                      <div className="lg:col-span-6">
                        <label htmlFor="name" className="font-semibold">
                          Tu Nombre:
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Nombre:"
                        />
                      </div>

                      <div className="lg:col-span-6">
                        <label htmlFor="email" className="font-semibold">
                          Tu Email:
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Email:"
                        />
                      </div>

                      <div className="lg:col-span-12">
                        <label htmlFor="subject" className="font-semibold">
                          Tu Pregunta:
                        </label>
                        <input
                          name="subject"
                          id="subject"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Asunto:"
                        />
                      </div>

                      <div className="lg:col-span-12">
                        <label htmlFor="comments" className="font-semibold">
                          Tu Comentario:
                        </label>
                        <textarea
                          name="comments"
                          id="comments"
                          className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Mensaje:"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      id="submit"
                      name="send"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md mt-2"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container lg:mt-24 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            <div className="text-center px-6">
              <div className="relative text-transparent">
                <div className="size-20 bg-fourth-base/5 text-fourth-base rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiPhone />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Teléfono</h5>
                <p className="text-slate-400 mt-3">
                  ¿Necesitas ayuda inmediata? Llámanos y te atenderemos con gusto para resolver
                  todas tus dudas sobre EmprendyUp
                </p>

                <div className="mt-5">
                  <Link href="tel:+57-300-123-4567" className="text-fourth-base font-medium">
                    +57 300 123 4567
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center px-6">
              <div className="relative text-transparent">
                <div className="size-20 bg-fourth-base/5 text-fourth-base rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiMail />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Email</h5>
                <p className="text-slate-400 mt-3">
                  Escríbenos y te responderemos en menos de 24 horas con toda la información que
                  necesites para tu emprendimiento
                </p>

                <div className="mt-5">
                  <Link href="mailto:hola@emprendyup.com" className="text-fourth-base font-medium">
                    hola@emprendyup.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center px-6">
              <div className="relative text-transparent">
                <div className="size-20 bg-fourth-base/5 text-fourth-base rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                  <FiMapPin />
                </div>
              </div>

              <div className="content mt-7">
                <h5 className="title h5 text-lg font-semibold">Ubicación</h5>
                <p className="text-slate-400 mt-3">
                  Calle 72 #10-34, Oficina 501, <br /> Bogotá, Colombia
                </p>

                <ContactModal />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
