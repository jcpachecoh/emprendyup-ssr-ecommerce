import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../components/NavBar/navbar';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import CollapsibleFilter from '../components/CollapsibleFilter';
import ScrollToTop from '../components/scroll-to-top';

import ProductListClientWrapper from '../components/ProductListClientWrapper';

export default function ListLeftSidebar() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={false} />
      <section className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 mt-14">
            <h3 className="text-3xl leading-normal font-semibold">Catálogo</h3>
          </div>

          <div className="relative mt-3">
            <ul className="tracking-[0.5px] mb-0 inline-block">
              <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-fourth-base">
                <Link href="/">EmprendyUp</Link>
              </li>
              <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li
                className="inline-block uppercase text-[13px] font-bold text-fourth-base"
                aria-current="page"
              >
                Productos en Lista
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
            <CollapsibleFilter />

            <div className="lg:col-span-9 md:col-span-8">
              <div className="md:flex justify-between items-center mb-6">
                <span className="font-semibold">Mostrando 1-10 de 40 artículos</span>

                <div className="md:flex items-center">
                  <label className="font-semibold md:me-2">Ordenar por:</label>
                  <select className="form-select form-input md:w-36 w-full md:mt-0 mt-1 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                    <option defaultValue="">Destacados</option>
                    <option defaultValue="">En oferta</option>
                    <option defaultValue="">Alfabéticamente A-Z</option>
                    <option defaultValue="">Alfabéticamente Z-A</option>
                    <option defaultValue="">Precio: Bajo a Alto</option>
                    <option defaultValue="">Precio: Alto a Bajo</option>
                  </select>
                </div>
              </div>
              <ProductListClientWrapper page={1} pageSize={20} />
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
