"use client";

import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import SignInForm from "@/components/sign-in-form";

export function ProfileDropdown() {
  const userIsLoggedIn = false;
  //Byt till true om användaren är inloggad.

  // Om användaren INTE är inloggad, visa Sign In knapp med popup
  if (!userIsLoggedIn) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 transition transform hover:scale-110"
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
    );
  }

  // Om användaren ÄR inloggad, visa Profile dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 transition transform hover:scale-110"
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 py-0 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
