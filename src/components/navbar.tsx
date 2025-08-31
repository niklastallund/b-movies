"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { ShoppingCartSheet } from "./shopping-cart-sheet";
import { ProfileDropdown } from "./profile-dropdown";

// Skapa en separat komponent för mobilmenyns länkar!
const MobileLinks = ({
  movies,
  toplists,
}: {
  movies: string[];
  toplists: string[];
}) => (
  <div className="mt-4 flex flex-col space-y-2">
    <Link href="#" className="font-semibold text-primary text-lg">
      Home
    </Link>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start px-0 text-foreground text-lg"
        >
          Movies
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
          className="justify-start px-0 text-foreground text-lg"
        >
          Top Lists
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
    <Link href="#" className="font-semibold text-foreground text-lg">
      News
    </Link>
    <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
      <Link href="/sign-up" className="font-semibold text-foreground text-lg">
        Sign Up
      </Link>
      <Link href="/sign-in" className="font-semibold text-foreground text-lg">
        Log In
      </Link>
    </div>
  </div>
);

export function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const movies = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Sci-fi",
    "Thriller",
    "Romance",
    "Animated",
  ];
  const toplists = [
    "5 Most Bought Movies",
    "5 Latest Movies",
    "5 Oldest Movies",
    "5 Cheapest Movies",
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 border-b border-red-900 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/images/bmovies.png"
            alt="B-Movies logo"
            width={600}
            height={600}
            className="h-26 w-auto"
          />
        </Link>

        {/* SEARCH - CART - PROFILE - MOBILE BUTTON */}
        <div className="flex items-center md:order-2 space-x-2">
          {/* Search button that opens a search field */}
          <div className="flex items-center space-x-2">
            {isSearchVisible && (
              <Input
                type="search"
                placeholder="Search for movies..."
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
              <span className="sr-only">SEARCH</span>
            </Button>
          </div>

          {/* THEME BUTTON */}
          <ModeToggle />

          {/* Kundvagnkomponent */}
          <ShoppingCartSheet />

          {/* Profil komponenten */}
          <ProfileDropdown />

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              {/* Mobilmeny Länkar */}
              <MobileLinks movies={movies} toplists={toplists} />
            </SheetContent>
          </Sheet>
        </div>

        {/* NAVIGATION FOR DESKTOP */}
        <div className="hidden w-full md:flex md:w-auto md:order-1 text-sky-800 items-center justify-between">
          <ul className="flex items-center  font-medium space-x-8">
            <li>
              <Link
                href="#"
                className="block  text-md font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto  text-md font-medium text-sky-800 hover:text-primary"
                  >
                    Movies
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
                    className="p-0 h-auto text-md  font-medium text-sky-800 hover:text-primary"
                  >
                    Top Lists
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
                className="block text-md font-medium transition-colors hover:text-primary"
              >
                News
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
