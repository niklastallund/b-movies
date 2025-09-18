import { useSyncExternalStore } from "react";

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

// Minimal in-memory store (no external libs, no cookies)
type Listener = () => void;
const listeners = new Set<Listener>();

let state: CartState = {
  cartItems: [],
  addToCart: (item: CartItem) => {
    setState((prev) => {
      const existing = prev.cartItems.find((i) => i.id === item.id);
      const cartItems = existing
        ? prev.cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev.cartItems, item];
      return { cartItems };
    });
  },
  removeFromCart: (id: number) => {
    setState((prev) => ({
      cartItems: prev.cartItems.filter((i) => i.id !== id),
    }));
  },
  updateQuantity: (id: number, delta: number) => {
    setState((prev) => ({
      cartItems: prev.cartItems.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      ),
    }));
  },
  clearCart: () => {
    setState({ cartItems: [] });
  },
};

function emitChange() {
  listeners.forEach((l) => l());
}

function setState(
  partial: Partial<CartState> | ((prev: CartState) => Partial<CartState>)
): void {
  const next = typeof partial === "function" ? partial(state) : partial;
  state = { ...state, ...next };
  emitChange();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type UseCartStore = (<T>(selector: (s: CartState) => T) => T) & {
  setState: typeof setState;
  getState: () => CartState;
};

export const useCartStore: UseCartStore = ((selector) => {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state)
  );
}) as UseCartStore;

useCartStore.setState = setState;
useCartStore.getState = () => state;
