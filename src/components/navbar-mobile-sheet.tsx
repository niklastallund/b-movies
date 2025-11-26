"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInAndProfile } from "./sign-in-and-profile";
import SignUpAndOut from "./sign-up-and-out";

export function NavbarMobileSheet({
  toplists,
  isLoggedIn,
}: {
  toplists: { label: string; id: string }[];
  isLoggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // Helper to close sheet on link click
  const linkProps = {
    onClick: handleClose,
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-4 p-6 flex flex-col space-y-2">
          <Link
            href="/"
            className="font-semibold text-primary text-lg"
            {...linkProps}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="font-semibold text-primary text-lg"
            {...linkProps}
          >
            Movies
          </Link>
          <Link
            href="/person"
            className="font-semibold text-primary text-lg"
            {...linkProps}
          >
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
                  <Link href={`#${link.id}`} {...linkProps}>
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col space-y-4 pt-4 border-t border-border mt-4">
            {/* SIGN UP BUTTON FOR MOBILE */}
            <SignUpAndOut isLoggedIn={isLoggedIn} />
            {/* SIGN IN BUTTON FOR MOBILE */}
            <SignInAndProfile isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </SheetContent>
      <SheetTitle className="sr-only">menu</SheetTitle>
    </Sheet>
  );
}
