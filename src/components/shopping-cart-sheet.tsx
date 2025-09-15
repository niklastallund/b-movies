"use client";
import Image from "next/image";
import { useCartStore } from "@/store/cookie-cart";
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
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function ShoppingCartSheet() {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setCartItems = useCartStore.setState;

  // Synka cookies till Zustand-store vid varje sidladdning/render
  useEffect(() => {
    const cookie = Cookies.get("cartItems");
    if (cookie) {
      setCartItems({ cartItems: JSON.parse(cookie) });
    }
  }, []);

  // För att undvika hydration error: Rendera badge först när vi är på klientsidan
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

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
          {/* Visa badge först när vi är på klientsidan för att undvika SSR/CSR mismatch */}
          {isClient && cartItems.length > 0 && (
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
                key={item.id + (item.tmdb ? "-tmdb" : "")}
                className="flex m-6 items-center justify-between"
              >
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={48}
                    height={64}
                    className="w-12 h-16 object-cover mr-2 rounded"
                    unoptimized
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} kr
                  </p>
                  {item.tmdb && (
                    <span className="text-xs text-blue-500">TMDB-film</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => removeFromCart(item.id)}
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
        <SheetFooter className="mt-4 flex flex-col gap-2">
          <Link href="/checkout" className="w-full">
            <Button className="w-full text-white">Go to Checkout</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
