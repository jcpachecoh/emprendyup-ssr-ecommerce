import React from 'react';
import Link from 'next/link';
import Navbar from '../components/NavBar/navbar';
import { termsData } from '../data/data';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

export default function Privacy() {
  return (
    <>
      <section className="relative table w-full py-32 lg:py-40 bg-gray-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="text-3xl leading-normal font-semibold">Política de Privacidad</h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-fourth-base">
              <Link href="/">EmprendyUp</Link>
            </li>
            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-fourth-base">
              <Link href="#">Utilidades</Link>
            </li>
            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold text-fourth-base"
              aria-current="page"
            >
              Privacidad
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                <h5 className="text-xl font-semibold mb-4">Resumen general:</h5>
                <p className="text-slate-400">
                  En EmprendyUp valoramos tu privacidad. Esta política explica cómo recopilamos,
                  usamos y protegemos tu información personal cuando usas nuestra plataforma para
                  emprendedores.
                </p>
                <p className="text-slate-400">
                  Al utilizar EmprendyUp, aceptas nuestras prácticas en relación con tus datos. Nos
                  comprometemos a brindarte transparencia y control sobre tu información.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Usamos tu información para:</h5>
                <ul className="list-none text-slate-400 mt-4">
                  {termsData.map((item, index) => {
                    return (
                      <li className="flex mt-2 ms-0" key={index}>
                        <i className="mdi mdi-chevron-right text-fourth-base text-lg align-middle me-2"></i>
                        {item}
                      </li>
                    );
                  })}
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  Información proporcionada voluntariamente:
                </h5>
                <p className="text-slate-400">
                  Recopilamos datos como tu nombre, correo electrónico, y detalles de tu tienda
                  cuando te registras o utilizas nuestras funcionalidades. Esta información se usa
                  exclusivamente para mejorar tu experiencia en EmprendyUp.
                </p>
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
