import React from 'react';
import Link from 'next/link';

import Navbar from '../components/NavBar/navbar';
import MobileApp from '../components/mobile-app';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

export default function ShopCheckout() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={false} />
      <section className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 mt-14">
            <h3 className="text-3xl leading-normal font-semibold">Verificar pedido</h3>
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
                Verificar
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
            <div className="lg:col-span-8">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                <h3 className="text-xl leading-normal font-semibold">Dirección de Envio</h3>

                <form>
                  <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                    <div className="lg:col-span-6">
                      <label className="form-label font-semibold">
                        Nombre : <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Nombre"
                        id="firstname"
                        name="name"
                        required
                      />
                    </div>

                    <div className="lg:col-span-6">
                      <label className="form-label font-semibold">
                        Apellido : <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Apellido"
                        id="lastname"
                        name="name"
                        required
                      />
                    </div>

                    <div className="lg:col-span-6">
                      <label className="form-label font-semibold">Usuario</label>
                      <div className="relative mt-2">
                        <span
                          className="absolute top-0.5 start-0.5 w-9 h-9 text-xl bg-gray-100 dark:bg-slate-800 inline-flex justify-center items-center text-dark dark:text-white rounded"
                          id="basic-addon1"
                        >
                          <i className="mdi mdi-at"></i>
                        </span>
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Usuario"
                          required
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <label className="form-label font-semibold">
                        Correo Electrónico: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Correo Electrónico"
                        name="email"
                        required
                      />
                    </div>

                    <div className="lg:col-span-12">
                      <label className="form-label font-semibold">
                        Dirección : <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Dirección"
                        id="address"
                        name="name"
                        required
                      />
                    </div>

                    <div className="lg:col-span-12">
                      <label className="form-label font-semibold">Dirección 2: </label>
                      <input
                        type="text"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Dirección 2"
                        id="address"
                        name="name"
                        required
                      />
                    </div>

                    <div className="lg:col-span-4">
                      <label className="font-semibold">Ciudad:</label>
                      <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                        <option value="BOGOTA">Bogotá</option>
                        <option value="CALI">Cali</option>
                        <option value="BARRANQUILLA">Barranquilla</option>
                        <option value="MEDELLIN">Medellín</option>
                      </select>
                    </div>

                    {/* <div className="lg:col-span-4">
                      <label className="font-semibold">State:</label>
                      <select className="form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0">
                        <option value="CAL">California</option>
                        <option value="TEX">Texas</option>
                        <option value="FLOR">Florida</option>
                      </select>
                    </div> */}

                    <div className="lg:col-span-4">
                      <label className="form-label font-semibold">
                        Codigo postal : <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                        placeholder="Codigo postal"
                        id="zipcode"
                        name="number"
                        required
                      />
                    </div>

                    <div className="lg:col-span-12">
                      <div className="flex items-center w-full mb-0">
                        <input
                          className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          type="checkbox"
                          value=""
                          id="sameaddress"
                        />
                        <label className="form-check-label text-slate-400" htmlFor="sameaddress">
                          La dirección de envío es la misma que la de facturación
                        </label>
                      </div>

                      <div className="flex items-center w-full mb-0">
                        <input
                          className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          type="checkbox"
                          value=""
                          id="savenexttime"
                        />
                        <label className="form-check-label text-slate-400" htmlFor="savenexttime">
                          Guardar esta información para la próxima vez
                        </label>
                      </div>
                    </div>
                  </div>
                </form>

                <h3 className="text-xl leading-normal font-semibold mt-6">Método de pago</h3>

                <form>
                  <div>
                    <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                      <div className="lg:col-span-12">
                        <div className="block">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                name="radio-colors"
                                value="1"
                                readOnly
                                defaultChecked
                              />
                              <span className="text-slate-400">Tarjeta de crédito</span>
                            </label>
                          </div>
                        </div>

                        <div className="block mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                name="radio-colors"
                                value="1"
                                readOnly
                              />
                              <span className="text-slate-400">Tarjeta de débito</span>
                            </label>
                          </div>
                        </div>

                        <div className="block mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                name="radio-colors"
                                value="1"
                                readOnly
                              />
                              <span className="text-slate-400">PayPal</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Nombre del titular de la cuenta: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                          placeholder="Nombre"
                          id="accountname"
                          name="name"
                          required
                        />
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Número de tarjeta de crédito: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                          placeholder="**** **** **** ****"
                          id="cardnumber"
                          name="number"
                          required
                        />
                      </div>

                      <div className="lg:col-span-3">
                        <label className="form-label font-semibold">
                          Fecha de expiración: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                          placeholder="mm/yyyy"
                          id="expiration"
                          name="number"
                          required
                        />
                      </div>

                      <div className="lg:col-span-3">
                        <label className="form-label font-semibold">
                          CVV : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2"
                          placeholder="***"
                          id="cvv"
                          name="number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-4">
                  <input
                    type="submit"
                    className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-fourth-base text-black rounded-md w-full"
                    value="Continuar con la compra"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold">Tu carrito</h5>

                  <Link
                    href="#"
                    className="bg-fourth-base flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5"
                  >
                    3
                  </Link>
                </div>

                <div className="mt-4 rounded-md shadow dark:shadow-gray-800">
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold">Nombre del producto</h5>
                      <p className="text-sm text-slate-400">Descripción breve</p>
                    </div>

                    <p className="text-slate-400 font-semibold">$ 12.000</p>
                  </div>
                  <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                    <div>
                      <h5 className="font-semibold">Segundo producto</h5>
                      <p className="text-sm text-slate-400">Descripción breve</p>
                    </div>

                    <p className="text-slate-400 font-semibold">$ 300.000</p>
                  </div>
                  <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                    <div>
                      <h5 className="font-semibold">Tercer producto</h5>
                      <p className="text-sm text-slate-400">Descripción breve</p>
                    </div>

                    <p className="text-slate-400 font-semibold">$ 20.000</p>
                  </div>
                  <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-slate-800 text-green-600">
                    <div>
                      <h5 className="font-semibold">Código promocional</h5>
                      <p className="text-sm text-green-600">EXAMPLECODE</p>
                    </div>

                    <p className="text-red-600 font-semibold">-$ 100.000</p>
                  </div>
                  <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                    <div>
                      <h5 className="font-semibold">Total (COP)</h5>
                    </div>

                    <p className="font-semibold">$ 300.000</p>
                  </div>
                </div>

                <div className="subcribe-form mt-6">
                  <div className="relative max-w-xl">
                    <input
                      type="email"
                      id="subcribe"
                      name="email"
                      className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
                      placeholder="código promocional"
                    />
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-fourth-base text-black rounded-full"
                    >
                      Redimir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileApp />
      </section>
      <Footer />
      <Switcher />
      <ScrollToTop />
    </>
  );
}
