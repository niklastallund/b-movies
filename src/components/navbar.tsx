"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/toggle-theme-button";
import { ShoppingCartSheet } from "./shopping-cart-sheet";
import { ProfileDropdown } from "./button-signin-signout";
import SignUpForm from "@/components/sign-up-form";
import SignInForm from "@/components/sign-in-form";

const MobileLinks = ({
  toplists,
}: {
  toplists: { label: string; id: string }[];
}) => (
  <div className="mt-4 p-6 flex flex-col space-y-2">
    <Link href="/" className="font-semibold text-primary text-lg">
      Home
    </Link>
    <Link href="/movies" className="font-semibold text-primary text-lg">
      Movies
    </Link>
    <Link href="/person" className="font-semibold text-primary text-lg">
      People
    </Link>
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
          <DropdownMenuItem key={link.id} asChild>
            <Link href={`#${link.id}`}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
      {/* SIGN UP BUTTON FOR MOBILE */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="justify-start font-semibold text-lg gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign Up</DialogTitle>
          </DialogHeader>
          <SignUpForm />
        </DialogContent>
      </Dialog>

      {/* SIGN IN BUTTON FOR MOBILE */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="justify-start font-semibold text-lg gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign In</DialogTitle>
          </DialogHeader>
          <SignInForm />
        </DialogContent>
      </Dialog>
    </div>
  </div>
);

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const query = searchTerm
        .trim()
        .split(/\s+/)
        .map(encodeURIComponent)
        .join("+");
      router.push(`/movies?q=${query}`);
      setSearchTerm("");
    }
  };

  const toplists = [
    { label: "Top 5 Latest Movies", id: "latest" },
    { label: "Top 5 Most Popular Movies", id: "popular" },
    { label: "Top 5 Oldest Movies", id: "oldest" },
    { label: "Top 5 Cheapest Movies", id: "cheapest" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={
              mounted && theme === "light"
                ? "/images/bmovies-blue.png"
                : "/images/bmovies.png"
            }
            alt="B-Movies logo"
            width={600}
            height={600}
            className="h-12 w-auto"
          />
        </Link>

        {/* SEARCH - CART - PROFILE - MOBILE BUTTON */}
        <div className="flex items-center md:order-2 space-x-2">
          {/* Search field */}
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search for movies..."
              className="w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* THEME BUTTON */}
          <ModeToggle />

          {/* SHOPPING CART */}
          <ShoppingCartSheet />

          {/* PROFILE DROPDOWN - ENDAST DESKTOP */}
          <div className="hidden md:block">
            <ProfileDropdown />
          </div>

          {/* SIGN UP BUTTON - ENDAST DESKTOP */}
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition transform hover:scale-110"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="sr-only">Sign Up</DialogTitle>
                </DialogHeader>
                <SignUpForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-xs">
              <MobileLinks toplists={toplists} />
            </SheetContent>
            <SheetTitle className="sr-only">menu</SheetTitle>
          </Sheet>
        </div>

        {/* NAVIGATION FOR DESKTOP */}
        <div className="hidden w-full md:flex md:w-auto md:order-1 text-foreground items-center justify-between">
          <ul className="flex items-center font-medium space-x-8">
            <li>
              <Link
                href="/"
                className="block text-md font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/movies"
                className="block text-md font-medium transition-colors hover:text-primary"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/person"
                className="block text-md font-medium transition-colors hover:text-primary"
              >
                People
              </Link>
            </li>
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-md font-medium text-foreground hover:text-primary"
                  >
                    Top Lists
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {toplists.map((link) => (
                    <DropdownMenuItem key={link.id} asChild>
                      <Link href={`/#${link.id}`}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
