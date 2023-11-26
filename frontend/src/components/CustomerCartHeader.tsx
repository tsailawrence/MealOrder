"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DatePickerDemo } from "./DatePicker";
import { ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Item } from "@/lib/types/db";
interface OrderDetailsProps {
  items: Item[];
  restaurantName: string;
}
const CustomerCartHeader: React.FC<OrderDetailsProps> = ({
  items,
  restaurantName
}) => {
  const handleDecrease = () => {
    console.log("decrease");
  };
  const handleAdd = () => {
    console.log("add");
  };
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
            Choose Pick Up Time : <DatePickerDemo />
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="name">Order Summary</Label>
            <Separator className="mt-2 mb-2"/>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item: Item, index: number) => (
                <AccordionItem value={item.name} key={index}>
                  <div className="flex items-center w-full text-left">
                    <div className="flex flex-col w-[50%]">
                      <div className="text-neutral-400 mt-1">
                        {restaurantName} {/* 第一个左对齐的内容 */}
                      </div>
                      <div className="text-base font-semibold mt-1 mb-2">
                        {item.name}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex text-base font-semibold gap-2">
                        <Button
                          className="items-stretch border self-stretch flex aspect-square flex-col p-2 rounded-lg border-opacity-10"
                          onClick={() => handleDecrease()}
                          aria-label="Product Image"
                        >
                          -
                        </Button>
                        <div className="text-black text-center text-base leading-6 mt-2 ">
                          {item.quantity}
                        </div>
                        <Button
                          className="items-stretch border self-stretch flex aspect-square flex-col p-2 rounded-lg border-solid"
                          onClick={() => handleAdd()}
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
                  <AccordionContent>
                    <div className="flex flex-col items-start w-full">
                      <div className="text-base font-semibold">
                        {item.specialInstructions.map(
                          (instruction, index) => (
                            <div className="flex text-neutral-400" key={index}>{instruction}</div>
                          )
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>))}
            </Accordion>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="reset">Place Order</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default CustomerCartHeader;
