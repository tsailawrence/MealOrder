"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Item } from "@/lib/types/db";
import {DatePicker} from "@/components/DatePicker";
import {HourMinute} from "@/components/HourMinute";
type Cart = {
  restaurantName: string;
  items: Item[]; //item name, price, quantity
};
type Orders = {
  cart: Cart;
  pickupTime: Date;
  userId: string;
};
const CustomerCartHeader = () => {
  const [cart, setCart] = useState<Cart>({ restaurantName: '', items: [] });

  // Effect to load cart data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    }
  }, []);


  const updateItemQuantity = (index: number, change: number) => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        let cart: Cart = JSON.parse(cartData);
        // Update the quantity, ensuring it doesn't go below 1 if before if 1 then delete the item
        if (cart.items[index].quantity === 1 && change === -1) {
          cart.items.splice(index, 1);
        } else {
          cart.items[index].quantity = Math.max(1, cart.items[index].quantity + change);
        }
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        //refresh the page
        setCart(cart);
      }
    }
  }

  const handleAdd = (index: number) => {
    updateItemQuantity(index, 1);
  }

  const handleDecrease = (index: number) => {
    updateItemQuantity(index, -1);
  }

  const handleSubmit = () => {
    let orders: Orders = {
      cart: cart,
      pickupTime: new Date(),
      userId: '1'
    }
    console.log('orders:', orders);
    // Delete cart from local storage
    let newCart = {restaurantName: '', items: [] }
    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log('newCart:', newCart);
    // window.location.reload(); // Refresh the page
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=""
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="h-6 w-6" color="#E60012" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Choose Pick Up Time : <br/>
            <DatePicker /> 
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="name">Order Summary</Label>
            <Separator className="mt-2 mb-2" />
            <Accordion type="single" collapsible className="w-full">
              {cart.items.map((item: Item, index: number) => (
                <AccordionItem value={item.name} key={index}>
                  <div className="flex items-center w-full text-left">
                    <div className="flex flex-col w-[50%]">
                      <div className="text-neutral-400 mt-1">
                        {cart.restaurantName} {/* 第一个左对齐的内容 */}
                      </div>
                      <div className="text-base font-semibold mt-1 mb-2">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex text-base font-semibold gap-2">
                        <Button
                          className="items-stretch border self-stretch flex aspect-square flex-col p-2 rounded-lg border-opacity-10"
                          onClick={() => handleDecrease(index)}
                          aria-label="Product Image"
                        >
                          -
                        </Button>
                        <div className="text-black text-center text-base leading-6 mt-2 ">
                          {item.quantity}
                        </div>
                        <Button
                          className="items-stretch border self-stretch flex aspect-square flex-col p-2 rounded-lg border-solid"
                          onClick={() => handleAdd(index)}
                          aria-label="Product Image"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      ${item.price * item.quantity}
                    </div>
                    <AccordionTrigger key={index}>
                    </AccordionTrigger>
                  </div>
                  {item.specialInstructions && <AccordionContent>
                    <div className="flex flex-col items-start w-full">
                      <div className="text-base font-semibold">
                        {item.specialInstructions.map(
                          (instruction, index) => (
                            <div className="flex text-neutral-400" key={index}>{instruction}</div>
                          )
                        )}
                      </div>
                    </div>
                  </AccordionContent>}
                </AccordionItem>))}
            </Accordion>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="reset" onClick={handleSubmit}>Place Order</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default CustomerCartHeader;
