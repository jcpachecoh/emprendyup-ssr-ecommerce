'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductDetail() {
  let [count, setCount] = useState(0);

  const increments = () => {
    setCount(count + 1);
  };
  const decrements = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="sticky top-20">
      <h5 className="text-2xl font-semibold">Chaqueta Marrón para Hombre</h5>
      <div className="mt-2">
        <span className="text-slate-400 font-semibold me-1">
          $45.000 <del className="text-red-600">$60.000</del>
        </span>

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
          <li className="inline text-slate-400 font-semibold">4.8 (45)</li>
        </ul>
      </div>

      <div className="mt-4">
        <h5 className="text-lg font-semibold">Reseña :</h5>
        <p className="text-slate-400 mt-2">
          Chaqueta marrón para hombre, hecha de cuero de alta calidad. Perfecta para ocasiones
          casuales y formales. Disponible en varias tallas y colores.
        </p>

        <ul className="list-none text-slate-400 mt-4">
          <li className="mb-1 flex ms-0">
            <i className="mdi mdi-check-circle-outline text-fourth-base text-xl me-2"></i> Digital
            Agency &amp; Marketing Solutions
          </li>
          <li className="mb-1 flex ms-0">
            <i className="mdi mdi-check-circle-outline text-fourth-base text-xl me-2"></i> Our
            Talented & Experienced Marketing Agency
          </li>
          <li className="mb-1 flex ms-0">
            <i className="mdi mdi-check-circle-outline text-fourth-base text-xl me-2"></i> Create
            your own skin to match your brand
          </li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4">
        <div className="flex items-center">
          <h5 className="text-lg font-semibold me-2">Talla:</h5>
          <div className="space-x-1">
            <Link
              href=""
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white"
            >
              S
            </Link>
            <Link
              href=""
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white"
            >
              M
            </Link>
            <Link
              href=""
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white"
            >
              L
            </Link>
            <Link
              href=""
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white"
            >
              XL
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <h5 className="text-lg font-semibold me-2">Cantidad:</h5>
          <div className="qty-icons ms-3 space-x-0.5">
            <button
              onClick={() => decrements()}
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white minus"
            >
              -
            </button>
            <input
              min="0"
              name="quantity"
              value={count}
              onChange={() => {}}
              type="number"
              className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white pointer-events-none w-16 ps-4 quantity"
            />
            <button
              onClick={() => increments()}
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white plus"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <h5 className="text-lg font-semibold me-2">Colores:</h5>
          <div className="space-x-2">
            <Link
              href=""
              className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-red-600 inline-flex align-middle"
              title="Red"
            ></Link>
            <Link
              href=""
              className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-orange-600 inline-flex align-middle"
              title="Orange"
            ></Link>
            <Link
              href=""
              className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-slate-900 inline-flex align-middle"
              title="Black"
            ></Link>
            <Link
              href=""
              className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 bg-gray-300 inline-flex align-middle"
              title="Gray"
            ></Link>
          </div>
        </div>
      </div>

      <div className="mt-4 space-x-1">
        <Link
          href=""
          className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center bg-fourth-base text-black rounded-md mt-2"
        >
          Comprar ahora
        </Link>
        <Link
          href=""
          className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white mt-2"
        >
          Añadir al carrito
        </Link>
      </div>
    </div>
  );
}
