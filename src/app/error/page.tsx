import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Switcher from '../components/switcher';
import BackToHome from '../components/back-to-home';

export default function Error() {
  return (
    <>
      <section className="relative bg-fourth-base/5">
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
              <div className="text-center">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    width={114}
                    height={22}
                    className="mx-auto block dark:hidden"
                    alt=""
                  />
                  <Image
                    src="/images/logo.svg"
                    width={114}
                    height={22}
                    className="mx-auto hidden dark:block"
                    alt=""
                  />
                </Link>
              </div>
              <div className="title-heading text-center my-auto">
                <Image
                  src="/images/error.svg"
                  width={288}
                  height={219}
                  className="mx-auto w-72"
                  alt=""
                />
                <h1 className="mt-8 mb-6 md:text-5xl text-3xl font-bold">Page Not Found?</h1>
                <p className="text-slate-400">
                  Whoops, this is embarassing. <br /> Looks like the page you were looking for
                  wasn&apos;t found.
                </p>

                <div className="mt-4">
                  <Link
                    href="/"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-fourth-base hover:bg-fourth-200 border-fourth-base hover:border-fourth-200 text-white rounded-md"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <p className="mb-0 text-slate-400">
                  © {new Date().getFullYear()} EmprendyUp. Design & Develop with{' '}
                  <i className="mdi mdi-heart text-red-600"></i> by{' '}
                  <Link href="https://shreethemes.in/" target="_blank" className="text-reset">
                    Shreethemes
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
      <BackToHome />
    </>
  );
}
