"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart } from "lucide-react";
import { ModeToggle } from "@/components/toggle-theme-button";

export function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // EXEMPEL TILLS VI HAR API
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Snow Sharks", price: 99 },
    { id: 2, name: "Apes on Mars", price: 129 },
  ]);

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
    "5 Most Bought Films",
    "5 Latest Films",
    "5 Oldest Films",
    "5 Cheapest Films",
  ];

  return (
    <nav className="bg-background/95 border-b border-red-900 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGGA */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/image/bfilmer.png"
            alt="B-Movies logo"
            width={600}
            height={600}
            className="h-26 w-auto"
          />
        </Link>

        {/* SÖK - VARUKORG - MY PAGE - MOBILKNAPP */}
        <div className="flex items-center md:order-2 space-x-2">
          {/* Sök knapp som öppnar ett sökfält */}
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

          {/* FÄRG THEME KNAPP */}
          <ModeToggle />

          {/* KUNDVAGN DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground hover:text-primary transition transform hover:scale-110"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">Shopping Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-blue-700 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">
                        {item.price} kr
                      </span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/checkout" className="w-full text-center">
                      <Button className="w-full">Go to Checkout</Button>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem className="flex justify-center text-muted-foreground">
                  Cart is empty
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* DROPDOWN för MyPages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center bg-red-800 text-white hover:text-primary transition transform hover:scale-110"
              >
                My Pages
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Sign Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-in">Log In</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* MOBILE MENY */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              <div className="mt-4 flex flex-col space-y-2">
                <Link href="#" className="font-semibold text-primary text-lg">
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-0 text-foreground"
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
                      className="justify-start px-0 text-foreground"
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
                <Link
                  href="#"
                  className="font-semibold text-foreground text-lg"
                >
                  News
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
                  <Link
                    href="/sign-up"
                    className="font-semibold text-foreground text-lg"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/sign-in"
                    className="font-semibold text-foreground text-lg"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* NAVIGERING FÖR DESKTOP*/}
        <div className="hidden w-full md:flex md:w-auto md:order-1 items-center justify-between">
          <ul className="flex items-center font-medium space-x-8">
            <li>
              <Link
                href="#"
                className="block text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm font-medium text-foreground hover:text-primary"
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
                    className="p-0 h-auto text-sm font-medium text-foreground hover:text-primary"
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
                className="block text-sm font-medium transition-colors hover:text-primary"
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
