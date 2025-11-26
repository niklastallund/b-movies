"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    // ...your animation logic...
    const mainHeading = document.getElementById("main-heading");
    const subHeading = document.getElementById("sub-heading");
    const mainHeadingMobile = document.getElementById("main-heading-mobile");
    const subHeadingMobile = document.getElementById("sub-heading-mobile");

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
    <div>
      <section
        id="desktop-hero"
        className="relative h-screen w-screen flex flex-col justify-center items-center text-center px-4"
      >
        {/* Desktop Image */}
        <Image
          src="/images/hero1.png"
          alt=""
          fill
          priority
          aria-hidden
          className="hidden md:block object-cover -z-10"
          sizes="100vw"
        />
        {/* Mobile Image */}
        <Image
          src="/images/hero1mobil.png"
          alt=""
          fill
          priority
          aria-hidden
          className="block md:hidden object-cover -z-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background opacity-60 z-0"></div>
        <div className="z-10 relative">
          <h1
            id="main-heading"
            className="text-5xl md:text-7xl font-extrabold mb-4 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Discover the Best B-Movies
          </h1>
          <p
            id="sub-heading"
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 transform translate-y-full opacity-0 transition-all duration-1000 ease-out"
          >
            Dive into a world of weird, scary, and fantastically entertaining
            films that never made it to the A-list.
          </p>
          <Link href="#section3" className="inline-block">
            <Button className="px-8 py-4 rounded-lg font-bold text-lg bg-primary hover:bg-primary/90 transform transition-transform duration-300 hover:scale-105">
              Top 5 Movies
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
