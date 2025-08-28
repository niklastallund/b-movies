"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { ModeToggle } from "@/components/toggle-theme-button";

export function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const movies = [
    "Action",
    "Drama",
    "Komedi",
    "Skräck",
    "Sci-fi",
    "Thriller",
    "Romantik",
    "Animerat",
  ];
  const toplists = [
    "5 mest köpta filmerna",
    "5 senaste filmerna",
    "5 äldsta filmerna",
    "5 billigaste filmerna",
  ];

  return (
    <nav className="bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-3xl font-extrabold whitespace-nowrap text-primary">
            B-Movies
          </span>
        </Link>

        {/* SÖK - MinaSidor - Mobilknapp */}
        <div className="flex items-center md:order-2 space-x-2">
          {/* Sök-knapp och fält */}
          <div className="flex items-center space-x-2">
            {isSearchVisible && (
              <Input
                type="search"
                placeholder="Sök efter filmer..."
                className="w-full md:w-64"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="text-foreground hover:text-primary transition transform hover:scale-110"
            >
              <Search className="w-6 h-6" />
              <span className="sr-only">SÖK</span>
            </Button>
          </div>

          {/* Färgtema-knapp */}
          <ModeToggle />

          {/* DROPDOWN för MinaSidor */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center text-foreground hover:text-primary transition transform hover:scale-110"
              >
                Mina sidor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Bli medlem</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-in">Logga in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* MOBIL meny Knapp */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Öppna meny</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              <div className="mt-4 flex flex-col space-y-2">
                <Link href="#" className="font-semibold text-primary text-lg">
                  Start
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-foreground"
                    >
                      Filmer
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    {movies.map((link) => (
                      <DropdownMenuItem key={link} asChild>
                        <Link href="#">{link}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-foreground"
                    >
                      Topplistor
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    {toplists.map((link) => (
                      <DropdownMenuItem key={link} asChild>
                        <Link href="#">{link}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href="#"
                  className="font-semibold text-foreground text-lg"
                >
                  Nyheter
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
                  <Link
                    href="/sign-up"
                    className="font-semibold text-foreground text-lg"
                  >
                    Bli medlem
                  </Link>
                  <Link
                    href="/sign-in"
                    className="font-semibold text-foreground text-lg"
                  >
                    Logga in
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* NAVBAR för Dator/Desktop */}
        <div className="hidden w-full md:flex md:w-auto md:order-1 items-center justify-between">
          <ul className="flex items-center font-medium space-x-8">
            <li>
              <Link
                href="#"
                className="block text-sm font-medium transition-colors hover:text-primary"
              >
                Start
              </Link>
            </li>
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm font-medium text-foreground hover:text-primary"
                  >
                    Filmer
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {movies.map((link) => (
                    <DropdownMenuItem key={link} asChild>
                      <Link href="#">{link}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm font-medium text-foreground hover:text-primary"
                  >
                    Topplistor
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {toplists.map((link) => (
                    <DropdownMenuItem key={link} asChild>
                      <Link href="#">{link}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link
                href="#"
                className="block text-sm font-medium transition-colors hover:text-primary"
              >
                Nyheter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
