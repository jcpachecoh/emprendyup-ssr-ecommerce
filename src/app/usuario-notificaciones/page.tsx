import React from 'react';
import Navbar from '../components/NavBar/navbar';
import Usertab from '../components/user-tab';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

export default function UserNotification() {
  return (
    <>
      <Navbar navClass="defaultscroll is-sticky" navlight={false} />

      <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
        <div className="md:container container-fluid relative">
          <div className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-700 h-52 bg-[url('/images/hero/pages.jpg')] bg-center bg-no-repeat bg-cover"></div>
        </div>

        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <Usertab />

            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
              <div className="rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h5 className="text-lg font-semibold">Notificaciones :</h5>
                </div>

                <div className="p-6">
                  <div className="flex justify-between pb-4">
                    <h6 className="mb-0 font-medium">Cuando alguien me menciona</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        id="noti1"
                      />
                      <label className="form-check-label" htmlFor="noti1"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Cuando alguien me sigue</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        defaultChecked
                        id="noti2"
                      />
                      <label className="form-check-label" htmlFor="noti2"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Cuando alguien comparte mi actividad</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        id="noti3"
                      />
                      <label className="form-check-label" htmlFor="noti3"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Cuando alguien me envía un mensaje</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        id="noti4"
                      />
                      <label className="form-check-label" htmlFor="noti4"></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h5 className="text-lg font-semibold">Notificaciones de Marketing :</h5>
                </div>

                <div className="p-6">
                  <div className="flex justify-between pb-4">
                    <h6 className="mb-0 font-medium">Hay una venta o promoción</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        id="noti5"
                      />
                      <label className="form-check-label" htmlFor="noti5"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Noticias de la empresa</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        id="noti6"
                      />
                      <label className="form-check-label" htmlFor="noti6"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Ofertas de trabajo semanales</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        defaultChecked
                        id="noti7"
                      />
                      <label className="form-check-label" htmlFor="noti7"></label>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
                    <h6 className="mb-0 font-medium">Nuevas Ofertas</h6>
                    <div className="">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-fourth-base focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50"
                        type="checkbox"
                        value=""
                        readOnly
                        defaultChecked
                        id="noti8"
                      />
                      <label className="form-check-label" htmlFor="noti8"></label>
                    </div>
                  </div>
                </div>
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
