'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { commentsData } from '../data/data';

import { FiUser, FiMail, FiMessageCircle } from '../assets/icons/vander';

export default function ProductAboutTab() {
  let [activeTab, setActiveTab] = useState(1);
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
      <div className="lg:col-span-3 md:col-span-5">
        <div className="sticky top-20">
          <ul
            className="flex-column p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li className="ms-0">
              <button
                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-fourth-base duration-500 ${activeTab === 1 ? 'text-white bg-fourth-base hover:text-white' : ''}`}
                onClick={() => setActiveTab(1)}
              >
                Descripción
              </button>
            </li>
            <li className="ms-0">
              <button
                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-fourth-base duration-500 ${activeTab === 2 ? 'text-white bg-fourth-base hover:text-white' : ''}`}
                onClick={() => setActiveTab(2)}
              >
                Información Adicional
              </button>
            </li>
            <li className="ms-0">
              <button
                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-fourth-base duration-500 ${activeTab === 3 ? 'text-white bg-fourth-base hover:text-white' : ''}`}
                onClick={() => setActiveTab(3)}
              >
                Reseñas
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-9 md:col-span-7">
        <div
          id="myTabContent"
          className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md"
        >
          {activeTab === 1 && (
            <div>
              <p className="text-slate-400">
                Chaqueta marrón para hombre, hecha de cuero de alta calidad. Perfecta para ocasiones
                casuales y formales. Disponible en varias tallas y colores.
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <table className="w-full text-start">
                <tbody>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="font-semibold pb-4" style={{ width: '100px' }}>
                      Color
                    </td>
                    <td className="text-slate-400 pb-4">Red, White, Black, Orange</td>
                  </tr>

                  <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
                    <td className="font-semibold py-4">Material</td>
                    <td className="text-slate-400 py-4">Algodón</td>
                  </tr>

                  <tr className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-700">
                    <td className="font-semibold pt-4">Talla</td>
                    <td className="text-slate-400 pt-4">S, M, L, XL, XXL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 3 && (
            <div>
              {commentsData.map((item, index) => {
                return (
                  <div className="mt-8 first:mt-0" key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          width={45}
                          height={45}
                          className="h-11 w-11 rounded-full shadow"
                          alt=""
                        />

                        <div className="ms-3 flex-1">
                          <Link
                            href=""
                            className="text-lg font-semibold hover:text-fourth-base duration-500"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-slate-400">{item.time}</p>
                        </div>
                      </div>

                      <Link
                        href=""
                        className="text-slate-400 hover:text-fourth-base duration-500 ms-5"
                      >
                        <i className="mdi mdi-reply"></i> Reply
                      </Link>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
                      <ul className="list-none inline-block text-orange-400">
                        <li className="inline">
                          <i className="mdi mdi-star text-lg"></i>
                        </li>
                        <li className="inline">
                          <i className="mdi mdi-star text-lg"></i>
                        </li>
                        <li className="inline">
                          <i className="mdi mdi-star text-lg"></i>
                        </li>
                        <li className="inline">
                          <i className="mdi mdi-star text-lg"></i>
                        </li>
                        <li className="inline">
                          <i className="mdi mdi-star text-lg"></i>
                        </li>
                        <li className="inline text-slate-400 font-semibold">5.0</li>
                      </ul>

                      <p className="text-slate-400 italic">{item.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                <h5 className="text-lg font-semibold">Deja un comentario:</h5>

                <form className="mt-8">
                  <div className="grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-6 mb-5">
                      <div className="text-start">
                        <label htmlFor="name" className="font-semibold">
                          Nombre:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiUser className="w-4 h-4 absolute top-3 start-4"></FiUser>
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
                          <FiMail className="w-4 h-4 absolute top-3 start-4"></FiMail>
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
                        <label htmlFor="comments" className="font-semibold">
                          Tu Comentario:
                        </label>
                        <div className="form-icon relative mt-2">
                          <FiMessageCircle className="w-4 h-4 absolute top-3 start-4"></FiMessageCircle>
                          <textarea
                            name="comments"
                            id="comments"
                            className="ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="Escribe tu mensaje aquí..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
