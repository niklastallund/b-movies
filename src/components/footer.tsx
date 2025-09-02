"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background/95 border-t border-red-900 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        {/* LOGGA */}
        <div className="flex items-center justify-center md:justify-start">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/bmovies.png"
              alt="B-Movies logo"
              width={100}
              height={100}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* KONTAKT INFO */}
        <div className="my-4 text-center md:my-0">
          <p className="text-sm text-foreground">
            📍Adress
            <br />
            1313 Swamp Lagoon Drive
            <br />
            Bayou Heights, FL 66613
            <br />
            🏟️ Landmark:
            <br />
            Across from Coach Gator’s Haunted Gymnasium
            <br /> 📞 Phone: (555) CHOMP-333
          </p>
        </div>

        {/* LÄNKAR */}
        <div className="flex flex-col items-center space-y-2 md:items-end">
          <Link
            href="#"
            className="text-sm  text-sky-600 font-medium text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm  text-sky-600 font-medium text-foreground hover:text-primary transition-colors"
          >
            Back to top
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-red-900 py-4 text-center">
        <p className="text-sm text-foreground">
          ©2025 Provided by Niklas, Josefine, Aminat
        </p>
      </div>
    </footer>
  );
}
