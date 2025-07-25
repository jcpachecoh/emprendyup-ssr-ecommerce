'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Switcher from '../components/switcher';
import BackToHome from '../components/back-to-home';

export default function Comingsoon() {
  let [days, setDays] = useState(0);
  let [hours, setHours] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let deadline = 'September, 13, 2025';
  let getTime = () => {
    let time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };
  useEffect(() => {
    let interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <section className="relative bg-[url('/images/hero/pages.jpg')] bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
              <div className="text-center">
                <Link href="/">
                  <Image
                    src="/images/logo.svg"
                    width={100}
                    height={100}
                    className="mx-auto"
                    alt=""
                  />
                </Link>
              </div>
              <div className="title-heading text-center my-auto">
                <h1 className="text-white mt-3 mb-6 md:text-5xl text-3xl font-bold">
                  Llegaremos pronto...
                </h1>
                <p className="text-white/70 text-lg max-w-xl mx-auto">
                  Comienza a trabajar con EmprendyUp que puede proporcionar todo lo que necesitas
                  para generar conciencia, atraer tráfico, conectar.
                </p>

                <div id="countdown">
                  <ul className="count-down list-none inline-block text-white text-center mt-8 m-6">
                    <li
                      id="days"
                      className="text-[40px] leading-[110px] h-[130px] w-[130px] rounded-full shadow-md bg-white/20 backdrop-opacity-30 inline-block m-2"
                    >
                      {days}
                      <p className="count-head">Dias</p>
                    </li>
                    <li
                      id="hours"
                      className="text-[40px] leading-[110px] h-[130px] w-[130px] rounded-full shadow-md bg-white/20 backdrop-opacity-30 inline-block m-2"
                    >
                      {hours}
                      <p className="count-head">Horas</p>
                    </li>
                    <li
                      id="mins"
                      className="text-[40px] leading-[110px] h-[130px] w-[130px] rounded-full shadow-md bg-white/20 backdrop-opacity-30 inline-block m-2"
                    >
                      {minutes}
                      <p className="count-head">Mins</p>
                    </li>
                    <li
                      id="secs"
                      className="text-[40px] leading-[110px] h-[130px] w-[130px] rounded-full shadow-md bg-white/20 backdrop-opacity-30 inline-block m-2"
                    >
                      {seconds}
                      <p className="count-head">Secs</p>
                    </li>
                    <li id="end" className="h1"></li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <p className="mb-0 text-slate-400">© {new Date().getFullYear()} EmprendyUp.</p>
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
