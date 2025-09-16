// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Carousels from "@/components/home-carousels";

export default function Home() {
  useEffect(() => {
    // ... din useEffect-logik för animationer
    const mainHeading = document.getElementById("main-heading");
    const subHeading = document.getElementById("sub-heading");
    const mainHeadingMobile = document.getElementById("main-heading-mobile");
    const subHeadingMobile = document.getElementById("sub-heading-mobile");

    // Hero-texten glider in från botten
    setTimeout(() => {
      if (mainHeading) {
        mainHeading.classList.remove("translate-y-full", "opacity-0");
        mainHeading.classList.add("translate-y-0", "opacity-100");
      }
      if (subHeading) {
        subHeading.classList.remove("translate-y-full", "opacity-0");
        subHeading.classList.add("translate-y-0", "opacity-100");
      }
      if (mainHeadingMobile) {
        mainHeadingMobile.classList.remove("translate-y-full", "opacity-0");
        mainHeadingMobile.classList.add("translate-y-0", "opacity-100");
      }
      if (subHeadingMobile) {
        subHeadingMobile.classList.remove("translate-y-full", "opacity-0");
        subHeadingMobile.classList.add("translate-y-0", "opacity-100");
      }
    }, 800);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {/* HERO för DESKTOP */}
      <section
        id="desktop-hero"
        className="relative h-screen w-screen hidden md:flex flex-col justify-center items-center text-center px-4 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero1.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10 relative">
          <h1
            id="main-heading"
            className="text-5xl md:text-7xl font-extrabold mb-4 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-700 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Discover the Best B-Movies
          </h1>
          <p
            id="sub-heading"
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Dive into a world of weird, scary, and fantastically entertaining
            films that never made it to the A-list.
          </p>
          <Link href="#section3" className="inline-block">
            <Button className="px-8 py-4 rounded-lg font-bold text-lg bg-red-800 hover:bg-red-900 text-white transform transition-transform duration-300 hover:scale-105">
              Top 5 Movies
            </Button>
          </Link>
        </div>
      </section>

      {/* HERO för MOBIL */}
      <section
        id="mobile-hero"
        className="flex flex-col md:hidden w-screen items-center text-center"
      >
        <div className="w-full flex flex-col justify-center items-center p-2 text-center">
          <h1
            id="main-heading-mobile"
            className="text-5xl font-extrabold mb-4  text-sky-800 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Discover the Best B-Movies
          </h1>
          <p
            id="sub-heading-mobile"
            className="text-lg max-w-3xl mx-auto mb-8 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Dive into a world of weird, scary, and fantastically entertaining
            films that never made it to the A-list.
          </p>
        </div>

        <div className="relative p-4 w-full h-auto ">
          <Image
            src="/images/hero1mobil.png"
            alt="Hero image of B-movies"
            width={1920}
            height={1080}
            layout="responsive"
            objectFit="contain"
            quality={100}
            className="rounded-lg"
          />
        </div>
      </section>

      <div className="relative z-10 py-24 w-full">
        {/* Använd din nya, server-renderade karusellkomponent här */}
        <Carousels />
      </div>
    </div>
  );
}
