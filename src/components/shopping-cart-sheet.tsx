"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function ShoppingCartSheet() {
  // EXEMPEL TILLS VI HAR API
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Snow Sharks", price: 99, quantity: 1 },
    { id: 2, name: "Apes on Mars", price: 129, quantity: 2 },
  ]);

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return {
            ...item,
            quantity: newQuantity > 0 ? newQuantity : 1,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground hover:text-primary transition transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">Shopping Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-sky-700 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex m-6 items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} kr
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              Your cart is empty.
            </div>
          )}
        </div>
        <Separator />
        {cartItems.length > 0 && (
          <div className="mt-4 m-6 flex justify-between font-bold">
            <span>Total:</span>
            <span>{totalAmount} kr</span>
          </div>
        )}
        <SheetFooter className="mt-4">
          <Link href="/checkout" className="w-full">
            <Button className="w-full text-white">Go to Checkout</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
