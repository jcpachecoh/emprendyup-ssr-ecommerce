'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const EnhancedFooter = () => {
  const paymentMethods = [
    '/images/payments/visa.jpg',
    '/images/payments/mastercard.jpg',
    '/images/payments/american-express.jpg',
    '/images/payments/paypal.jpg',
    '/images/payments/wompi.png',
  ];

  return (
    <motion.footer
      className="relative bg-slate-900 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo.svg"
              width={50}
              height={40}
              alt="EmprendyUp"
              className="mb-4"
            />
            <p className="text-slate-300 mb-6 max-w-md">
              La plataforma que impulsa tu emprendimiento con tecnología, comunidad y oportunidades
              de crecimiento.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/emprendyup/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-fourth-base transition-colors"
              >
                <FaInstagram />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=61581356851416#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-fourth-base transition-colors"
              >
                <FaFacebook />
              </Link>

              <Link href="#" className="text-slate-400 hover:text-fourth-base transition-colors">
                <FaTiktok />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/crear-tienda-online"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Crear tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/centro-de-ayuda"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-slate-400 hover:text-fourth-base transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm mb-2">Métodos de pago seguros:</p>
              <div className="flex space-x-3">
                {paymentMethods.map((method, index) => (
                  <Image
                    key={index}
                    src={method}
                    width={40}
                    height={25}
                    alt="Payment method"
                    className="rounded"
                  />
                ))}
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 EmprendyUp. Desarrollado en 🇨🇴 - Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default EnhancedFooter;
