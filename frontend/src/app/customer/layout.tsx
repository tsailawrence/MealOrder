"use client";
import Header from "@/components/CustomerHeader";
import { LocationProvider } from './LocationContext';
import type { AppProps } from 'next/app';
type Item = {
  name: string;
  price: number;
  quantity: number;
  note?: string;
  specialInstructions?: string[];
};
type Cart = {
  restaurantName: string;
  items: Item[]; //item name, price, quantity
};
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cart: Cart = { restaurantName: '', items: [] };
  // Check if in browser environment and update 'cart' accordingly
  if (typeof window !== 'undefined') {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      cart = JSON.parse(cartData);
    }
  }
  return (
    <LocationProvider>
    <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex flex-col items-center p-4 pt-20 grow">
          {children}
        </main>
    </div>
    </LocationProvider>
  );
}
