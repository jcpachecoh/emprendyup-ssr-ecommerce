'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiX } from '../assets/icons/vander';

export default function AddPaymentBtn() {
  let [modal, setModal] = useState(false);
  return (
    <>
      <li className="py-6 border-t border-gray-100 dark:border-gray-700">
        <Link
          href="#"
          scroll={false}
          onClick={() => setModal(!modal)}
          className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md"
        >
          Añadir método de pago
        </Link>
      </li>
      {modal && (
        <div className="rounded-md shadow dark:shadow-gray-800 bg-slate-900/75 text-slate-900 dark:text-white fixed w-full h-screen top-0 left-0 bottom-0 right-0 flex items-center justify-center z-999">
          <div className="relative w-full h-auto p-[20px] max-w-md inline-block bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg">Añadir método de pago</h3>
              <form>
                <button
                  className="size-6 flex justify-center items-center shadow dark:shadow-gray-800 rounded-md btn-ghost"
                  onClick={() => setModal(!modal)}
                >
                  <FiX className="size-4"></FiX>
                </button>
              </form>
            </div>
            <div className="p-6 text-center">
              <form>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="name" className="font-semibold text-start block">
                      Nombre
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      required
                      placeholder="Nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="ex_month" className="font-semibold text-start block">
                      Mes
                    </label>
                    <select
                      id="ex_month"
                      className="form-select mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded border border-gray-100 dark:border-gray-800 focus:ring-0"
                    >
                      <option>Ene</option>
                      <option>Feb</option>
                      <option>Mar</option>
                      <option>Abr</option>
                      <option>May</option>
                      <option>Jun</option>
                      <option>Jul</option>
                      <option>Ago</option>
                      <option>Sep</option>
                      <option>Oct</option>
                      <option>Nov</option>
                      <option>Dic</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ex_year" className="font-semibold text-start block">
                      Año
                    </label>
                    <select
                      id="ex_year"
                      className="form-select mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded border border-gray-100 dark:border-gray-800 focus:ring-0"
                    >
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="card_number" className="font-semibold text-start block">
                      Tarjeta no.
                    </label>
                    <input
                      name="number"
                      id="card_number"
                      type="text"
                      className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded border border-gray-100 dark:border-gray-800 focus:ring-0"
                      required
                      placeholder="***** **** **** "
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv_number" className="font-semibold text-start block">
                      CVV
                    </label>
                    <input
                      name="cvv"
                      id="cvv_number"
                      type="text"
                      className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded border border-gray-100 dark:border-gray-800 focus:ring-0"
                      required
                      placeholder="123"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="card_names" className="font-semibold text-start block">
                      Tipo de tarjeta
                    </label>
                    <select
                      id="card_names"
                      className="form-select mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded border border-gray-100 dark:border-gray-800 focus:ring-0"
                    >
                      <option>Visa</option>
                      <option>American Express</option>
                      <option>Mastercard</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="py-2 px-5 font-semibold tracking-wide duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                  >
                    Añadir tarjeta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
