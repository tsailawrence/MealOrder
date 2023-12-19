"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCookies } from "react-cookie";
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
import { DatePicker } from "@/components/DatePicker";
import { HourMinute } from "@/components/HourMinute";
import { addMyOrder } from "./actions";
import { CartCardProps } from "@/lib/types/db";
type Cart = {
  restaurantName: string;
  storeId: number;
  items: Item[]; //item name, price, quantity
};
type Orders = {
  cart: Cart;
  pickupTime: Date;
  userId: string;
};
const formatDateForMySQL = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedDate;
};

const CustomerCartHeader = () => {
  const [cart, setCart] = useState<Cart>({ restaurantName: '', storeId: 0, items: [] });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { __session: accessToken = '' } = cookies;
  const handleDateTimeChange = (date: Date, hour: string, minute: string, ampm: string) => {
    console.log('date:');
    if (date && hour && minute) {
      const updatedDate = new Date(date);
      const hourNumber = ampm === 'PM' ? parseInt(hour) % 12 + 12 : parseInt(hour) % 12;
      updatedDate.setHours(hourNumber, parseInt(minute));
      console.log('updatedDate:', updatedDate);
      setDateTime(updatedDate);
    }
  };
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
        console.log('cart:', cart);
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
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
    if (!dateTime) {
      alert('Please select a pickup time');
      return;
    }
    if (dateTime < new Date()) {
      alert('Please select a future pickup time');
      return;
    }
    // if cart is empty, then alert
    if (cart.items.length === 0) {
      alert('Please add items to cart');
      return;
    }
    let orders: Orders = {
      cart: cart,
      pickupTime: dateTime || new Date(),
      userId: '1'
    }
    console.log('orders:', orders);
    // Add order to database
    const ordersData: CartCardProps = {
      storeId: cart.storeId,
      payment: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      items: cart.items.map((item) => ({
        menuId: item.menuId,
        quantity: item.quantity,
        payment: item.price * item.quantity,
        specialInstructions: item.note,
      })),
      pickupTime: formatDateForMySQL(orders.pickupTime?.toString()),
    }
    addMyOrder(accessToken,ordersData);
    //refresh the page
    // Delete cart from local storage
    let newCart = { restaurantName: '', storeid: 0, items: [] }
    localStorage.setItem('cart', JSON.stringify(newCart));
    console.log('newCart:', newCart);
    // window.location.reload();
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
            Choose Pick Up Time : <br />
            <DatePicker onDateChange={(date) => handleDateTimeChange(date, '00', '00', 'AM')} />
            <HourMinute onTimeChange={(hour, minute, ampm) => dateTime && handleDateTimeChange(dateTime, hour, minute, ampm)} />
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="name">Order Summary</Label>
            <Separator className="mt-2 mb-2" />
            <Accordion type="single" collapsible className="w-full">
              {cart.items.map((item: Item, index: number) => (
                <AccordionItem value={index?.toString()} key={index}>
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
            <div className="flex justify-between mt-4">
              <div className="text-base font-semibold">Subtotal</div>
              <div className="text-base font-semibold">
                ${cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!dateTime || dateTime<new Date()}
            >
              Place Order
            </Button>
          </SheetClose>
        </SheetFooter>
        {cart.items.length === 0 && <div className='text-red-600 text-end'>Please add items to cart</div>}
        {dateTime && dateTime<new Date() && <div className='text-red-600 text-end'>Please select a future pickup time</div>}
      </SheetContent>
    </Sheet>
  );
}
export default CustomerCartHeader;
