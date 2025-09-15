import { create } from "zustand";
import Cookies from "js-cookie";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  tmdb?: boolean;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
}

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const cookie = Cookies.get("cartItems");
  return cookie ? JSON.parse(cookie) : [];
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: getInitialCart(),
  addToCart: (item) => {
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      let newCart;
      if (existing) {
        newCart = state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newCart = [...state.cartItems, item];
      }
      Cookies.set("cartItems", JSON.stringify(newCart), { expires: 7 });
      return { cartItems: newCart };
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const newCart = state.cartItems.filter((item) => item.id !== id);
      Cookies.set("cartItems", JSON.stringify(newCart), { expires: 7 });
      return { cartItems: newCart };
    });
  },
  updateQuantity: (id, delta) => {
    set((state) => {
      const newCart = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      Cookies.set("cartItems", JSON.stringify(newCart), { expires: 7 });
      return { cartItems: newCart };
    });
  },
  clearCart: () => {
    Cookies.remove("cartItems");
    set({ cartItems: [] });
  },
}));
