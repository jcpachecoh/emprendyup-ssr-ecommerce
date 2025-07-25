import React from 'react';
import Link from 'next/link';

import Navbar from '../components/navbar';
import FaqAbout from '../components/faq-about';
import GetInTouch from '../components/get-in-touch';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import { FiHelpCircle } from '../assets/icons/vander';

export default function Helpcenter() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={true} />

      <section className="relative table w-full py-36 bg-[url(/images/hero/pages.jpg)] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="mb-6 text-4xl leading-normal tracking-wider font-semibold text-white">
              ¡Hola! <br /> ¿Cómo podemos ayudarte?
            </h3>

            <div className="text-center subcribe-form mt-4 pt-2">
              <form className="relative mx-auto max-w-xl">
                <input
                  type="text"
                  id="help"
                  name="name"
                  className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white opacity-70 dark:bg-slate-900 border border-gray-100 dark:border-gray-700"
                  placeholder="Busca tus preguntas o temas..."
                />
                <button
                  type="submit"
                  className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-fourth-base text-black rounded-full"
                >
                  Buscar
                </button>
              </form>
            </div>
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
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              Centro de Ayuda
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <FaqAbout />

        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Comenzar
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              Mejora tu estilo con nuestros conjuntos seleccionados. Elige confianza, abraza tu
              aspecto único.
            </p>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-6">
            <div className="flex">
              <FiHelpCircle className="fea icon-ex-md text-fourth-base me-3 size-5 mt-1"></FiHelpCircle>
              <div className="flex-1">
                <h5 className="mb-2 text-xl font-semibold">
                  ¿Cómo funciona <span className="text-fourth-base">EmprendyUp</span>?
                </h5>
                <p className="text-slate-400">
                  EmprendyUp te permite conectar tu tienda en línea o física, mostrar tus productos
                  en una vitrina digital y acceder a una comunidad de emprendedores que te apoya en
                  cada paso. A través de herramientas tecnológicas y recompensas por participación,
                  EmprendyUp potencia el crecimiento de tu negocio y maximiza tu impacto.
                </p>
              </div>
            </div>

            <div className="flex">
              <FiHelpCircle className="fea icon-ex-md text-fourth-base me-3 size-5 mt-1"></FiHelpCircle>
              <div className="flex-1">
                <h5 className="mb-2 text-xl font-semibold">
                  {' '}
                  ¿Cuál es el proceso principal para abrir una cuenta?
                </h5>
                <p className="text-slate-400">
                  Crear una cuenta en EmprendyUp es muy fácil:
                  <p> 1. Regístrate con tu correo electrónico o cuenta de Google.</p>
                  <p> 2. Completa tu perfil con información básica de tu emprendimiento.</p>
                  <p>
                    {' '}
                    3. Conecta tu tienda o crea un catálogo de productos. ¡Y listo! Ya puedes
                    empezar a usar todas las funcionalidades de la plataforma.
                  </p>
                </p>
              </div>
            </div>

            <div className="flex">
              <FiHelpCircle className="fea icon-ex-md text-fourth-base me-3 size-5 mt-1"></FiHelpCircle>
              <div className="flex-1">
                <h5 className="mb-2 text-xl font-semibold">
                  {' '}
                  ¿Cómo hacer una entrada de datos ilimitada?
                </h5>
                <p className="text-slate-400">
                  EmprendyUp te ofrece un sistema flexible donde puedes cargar productos sin límite,
                  organizarlos por categorías, agregar imágenes, descripciones y precios. Puedes
                  hacerlo manualmente o integrando tu tienda actual para sincronizar automáticamente
                  tu inventario.
                </p>
              </div>
            </div>

            <div className="flex">
              <FiHelpCircle className="fea icon-ex-md text-fourth-base me-3 size-5 mt-1"></FiHelpCircle>
              <div className="flex-1">
                <h5 className="mb-2 text-xl font-semibold">
                  {' '}
                  ¿Es <span className="text-fourth-base">EmprendyUp</span> más seguro de usar con mi
                  cuenta?
                </h5>
                <p className="text-slate-400">
                  Sí, EmprendyUp está diseñado con altos estándares de seguridad. Tu información y
                  la de tus clientes está protegida mediante cifrado y autenticación segura. Además,
                  solo tú controlas quién accede a tu cuenta y a tus datos de negocio.
                </p>
              </div>
            </div>
          </div>
        </div>

        <GetInTouch />
      </section>
      <Footer />
      <Switcher />
      <ScrollToTop />
    </>
  );
}
