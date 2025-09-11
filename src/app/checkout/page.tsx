"use client";
import { useCartStore } from "@/store/cookie-cart";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

// DATATYPER
interface CheckoutForm {
  name: string;
  street: string;
  zipcode: string;
  city: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const [paid, setPaid] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>();

  // kalkylerar totalbeloppet
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // "Fake payment" - rensar kundvagn och visar tackmeddelande
  const onSubmit = (data: CheckoutForm) => {
    setPaid(true);
    clearCart();
    reset();
    // Spara och skicka data kan läggas till här
  };

  // Visar tackmeddelande efter betalning
  if (paid) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Thank you for your order!
        </h2>
        <p className="text-lg text-center">
          Your order has been registered. (This was a fake payment.)
        </p>
      </div>
    );
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Visa inget checkout-innehåll förrän vi är på klientsidan (för att undvika hydration error)
  if (!isClient) return null;

  // Main checkout view
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg bg-background dark:bg-zinc-900 transition-colors duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        {/* Tema-växlare borttagen */}
      </div>

      {/*Meddelande om kundvagn är tom */}
      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">
          Your cart is empty.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Lista av varor fårn kundvagnen */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-3 border-b border-muted last:border-b-0"
              >
                <span className="text-lg">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">
                  {item.price * item.quantity} kr
                </span>
              </div>
            ))}
          </div>

          {/* Totalkokstnad */}
          <div className="flex justify-between font-bold text-xl py-4 border-t border-muted">
            <span>Total:</span>
            <span>{total} SEK</span>
          </div>

          {/* Form för kunder */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your full name"
                className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
              />
              {errors.name && (
                <span className="text-destructive text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className="text-lg">
                Street Address
              </Label>
              <Input
                id="street"
                type="text"
                {...register("street", {
                  required: "Street address is required",
                })}
                placeholder="e.g. 123 Main St"
                className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
              />
              {errors.street && (
                <span className="text-destructive text-sm">
                  {errors.street.message}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="zipcode" className="text-lg">
                  Zip Code
                </Label>
                <Input
                  id="zipcode"
                  type="text"
                  {...register("zipcode", { required: "Zip code is required" })}
                  placeholder="e.g. 12345"
                  className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
                />
                {errors.zipcode && (
                  <span className="text-destructive text-sm">
                    {errors.zipcode.message}
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="city" className="text-lg">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  {...register("city", { required: "City is required" })}
                  placeholder="e.g. Anytown"
                  className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
                />
                {errors.city && (
                  <span className="text-destructive text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="your.email@example.com"
                className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
              />
              {errors.email && (
                <span className="text-destructive text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="e.g. +1 234 567 890"
                className="h-12 px-4 py-2 text-lg border-primary focus:ring-primary focus:border-primary"
              />
              {errors.phone && (
                <span className="text-destructive text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* "Pålossas betalning */}
          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold shadow-sm transition-colors duration-200 ease-in-out 
                       bg-primary hover:bg-primary-hover text-primary-contrast 
                       hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Pay (fake)
          </button>
        </form>
      )}
    </div>
  );
}
