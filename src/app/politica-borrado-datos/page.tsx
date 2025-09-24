'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/NavBar/navbar';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

const dataDeletionSteps = [
  'Enviar solicitud de eliminación por escrito a través de nuestros canales oficiales',
  'Verificación de identidad del solicitante para garantizar la seguridad',
  'Eliminación completa de datos personales de nuestros sistemas en 30 días hábiles',
  'Confirmación por escrito del proceso de eliminación completado',
  'Conservación únicamente de datos requeridos por ley durante el tiempo establecido',
  'Eliminación de copias de seguridad que contengan información personal',
];

const retentionPeriods = [
  'Datos de facturación: 10 años (obligación fiscal)',
  'Registros de transacciones: 5 años (obligación comercial)',
  'datos de marketing: Eliminación inmediata tras solicitud',
  'Logs de acceso: 1 año (seguridad del sistema)',
  'Datos de soporte: 2 años (calidad del servicio)',
  'Información de tiendas inactivas: 3 años tras última actividad',
];

export default function DataDeletionPolicy() {
  return (
    <>
      <section className="relative table w-full py-32 lg:py-40 bg-gray-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="text-3xl leading-normal font-semibold">Política de Borrado de Datos</h3>
            <p className="text-slate-400 text-lg mt-4 max-w-3xl mx-auto">
              Tu derecho al olvido y la eliminación segura de tus datos personales
            </p>
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
              Borrado de Datos
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                <h5 className="text-xl font-semibold mb-4">Tu derecho al olvido:</h5>
                <p className="text-slate-400">
                  En EmprendyUp respetamos tu derecho a la eliminación de datos personales. Como
                  usuario, tienes el derecho de solicitar la eliminación completa y permanente de tu
                  información personal de nuestros sistemas.
                </p>
                <p className="text-slate-400 mt-4">
                  Nos comprometemos a procesar tu solicitud de manera rápida, segura y transparente,
                  siguiendo las mejores prácticas de protección de datos y cumpliendo con la
                  normativa vigente de protección de datos personales.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  Proceso de eliminación de datos:
                </h5>
                <ul className="list-none text-slate-400 mt-4">
                  {dataDeletionSteps.map((step, index) => {
                    return (
                      <li className="flex mt-2 ms-0" key={index}>
                        <i className="mdi mdi-chevron-right text-fourth-base text-lg align-middle me-2"></i>
                        {step}
                      </li>
                    );
                  })}
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  Períodos de retención por tipo de datos:
                </h5>
                <p className="text-slate-400 mb-4">
                  Algunos datos deben conservarse por obligaciones legales o fiscales. A
                  continuación, los períodos de retención según el tipo de información:
                </p>
                <ul className="list-none text-slate-400 mt-4">
                  {retentionPeriods.map((period, index) => {
                    return (
                      <li className="flex mt-2 ms-0" key={index}>
                        <i className="mdi mdi-clock text-fourth-base text-lg align-middle me-2"></i>
                        {period}
                      </li>
                    );
                  })}
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  Cómo solicitar la eliminación de tus datos:
                </h5>
                <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mt-4">
                  <h6 className="font-semibold text-lg mb-3">Métodos de contacto:</h6>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="mdi mdi-email text-fourth-base text-xl me-3"></i>
                      <span className="text-slate-600 dark:text-slate-300">
                        Email: <strong>privacidad@emprendyup.com</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="mdi mdi-whatsapp text-fourth-base text-xl me-3"></i>
                      <span className="text-slate-600 dark:text-slate-300">
                        WhatsApp: <strong>+57 300 123 4567</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="mdi mdi-web text-fourth-base text-xl me-3"></i>
                      <span className="text-slate-600 dark:text-slate-300">
                        Formulario web: <strong>emprendyup.com/contacto</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <h5 className="text-xl font-semibold mb-4 mt-8">
                  Información requerida para procesar tu solicitud:
                </h5>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                    <li>
                      • <strong>Nombre completo</strong> registrado en la plataforma
                    </li>
                    <li>
                      • <strong>Email asociado</strong> a tu cuenta de EmprendyUp
                    </li>
                    <li>
                      • <strong>Número de teléfono</strong> registrado (si aplica)
                    </li>
                    <li>
                      • <strong>Nombre de tu tienda</strong> o emprendimiento (si aplica)
                    </li>
                    <li>
                      • <strong>Documento de identidad</strong> para verificación
                    </li>
                    <li>
                      • <strong>Motivo de la solicitud</strong> (opcional)
                    </li>
                  </ul>
                </div>

                <h5 className="text-xl font-semibold mb-4 mt-8">Excepciones y limitaciones:</h5>
                <p className="text-slate-400">
                  En algunos casos, no podremos eliminar completamente ciertos datos debido a:
                </p>
                <ul className="list-none text-slate-400 mt-4">
                  <li className="flex mt-2 ms-0">
                    <i className="mdi mdi-shield-check text-fourth-base text-lg align-middle me-2"></i>
                    Obligaciones legales y fiscales que requieren conservar registros
                  </li>
                  <li className="flex mt-2 ms-0">
                    <i className="mdi mdi-security text-fourth-base text-lg align-middle me-2"></i>
                    Necesidades de seguridad y prevención de fraude
                  </li>
                  <li className="flex mt-2 ms-0">
                    <i className="mdi mdi-gavel text-fourth-base text-lg align-middle me-2"></i>
                    Procedimientos legales en curso o potenciales
                  </li>
                  <li className="flex mt-2 ms-0">
                    <i className="mdi mdi-account-group text-fourth-base text-lg align-middle me-2"></i>
                    Derechos de terceros que podrían verse afectados
                  </li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mt-8">
                  <h6 className="font-semibold text-lg mb-3 text-green-700 dark:text-green-300">
                    📞 ¿Necesitas ayuda?
                  </h6>
                  <p className="text-slate-600 dark:text-slate-300">
                    Nuestro equipo de privacidad está disponible para resolver cualquier duda sobre
                    el proceso de eliminación de datos. Contáctanos y te guiaremos paso a paso.
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <Link
                    href="/contacto"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-fourth-base hover:bg-fourth-100 border-fourth-base hover:border-fourth-100 text-white rounded-md"
                  >
                    Contactar Soporte
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white rounded-md"
                  >
                    Imprimir Política
                  </button>
                </div>
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
