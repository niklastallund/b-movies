"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log("Footer theme:", theme);
    }
  }, [mounted, theme]);

  // Visa default logga under hydration
  if (!mounted) {
    return (
      <footer className="bg-background/95  border-t border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
        <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          {/* LOGGA */}
          <div className="flex items-center justify-center md:justify-start">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/images/bmovies.png" // Default logga under hydration
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
              Across from Coach Gator&apos;s Haunted Gymnasium
              <br /> 📞 Phone: (555) CHOMP-333
            </p>
          </div>

          {/* LÄNKAR */}
          <div className="flex flex-col items-center space-y-2 md:items-end">
            <Link
              href="/aboutus"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/aboutus"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Back to top
            </Link>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-border py-4 text-center">
          <p className="text-sm text-foreground">
            ©2025 Provided by Niklas, Josefine, Aminat
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-background/95 border-t border-border backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        {/* LOGGA */}
        <div className="flex items-center justify-center md:justify-start">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={
                theme === "light"
                  ? "/images/bmovies-blue.png"
                  : "/images/bmovies.png"
              }
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
            Across from Coach Gator&apos;s Haunted Gymnasium
            <br /> 📞 Phone: (555) CHOMP-333
          </p>
        </div>

        {/* LÄNKAR */}
        <div className="flex flex-col items-center space-y-2 md:items-end">
          <Link
            href="/aboutus"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/aboutus"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Back to top
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-border py-4 text-center">
        <p className="text-sm text-foreground">
          ©2025 Provided by Niklas, Josefine, Aminat
        </p>
      </div>
    </footer>
  );
}
