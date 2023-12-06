import React from "react";
import styles from "./_components/orders.module.css";
import { OrderTable } from "./_components/OrderTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerV2,
} from "@/components/ui/accordion"
import { Link } from "lucide-react";
const orderData = [
  {
    id: 1,
    name: "美式餐酒館",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/28 9:05 AM",
    total: "NT$200.00",
    status: "Preparing",
    pickupTime: "10/28 9:15 AM",
  },
  {
    id: 2,
    name: "Donuts hut",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/28 8:15 AM",
    total: "NT$120.00",
    status: "Confirmed",
    pickupTime: "10/28 11:15 AM",
  },
  {
    id: 3,
    name: "美式餐酒館",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    },
    {
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/27 7:05 AM",
    total: "NT$520.00",
    status: "Completed",
    pickupTime: "10/28 9:15 AM",
  },
  {
    id: 1,
    name: "美式餐酒館",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/28 9:05 AM",
    total: "NT$200.00",
    status: "Preparing",
    pickupTime: "10/28 9:15 AM",
  },
  {
    id: 2,
    name: "Donuts hut",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 2,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/28 8:15 AM",
    total: "NT$120.00",
    status: "Confirmed",
    pickupTime: "10/28 11:15 AM",
  },
  {
    id: 3,
    name: "美式餐酒館",
    items: [{
      id: 1,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 4,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    },
    {
      id: 5,
      name: "Burger",
      price: 100,
      quantity: 2,
      note: "No onion",
      specialInstructions: ["No onion"],
    },
    {
      id: 6,
      name: "Fries",
      price: 50,
      quantity: 1,
      note: "",
      specialInstructions: [],
    }],
    time: "10/27 7:05 AM",
    total: "NT$520.00",
    status: "Completed",
    pickupTime: "10/28 9:15 AM",
  },
];

const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Orders</h1>
      <Accordion type="single" collapsible className="w-full">
        {orderData.map((order, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`} className="w-full">
            <AccordionTriggerV2 className="w-full"><OrderTable key={index} order={order} /></AccordionTriggerV2>
            <AccordionContent >
              {order.items.map((item, index) => (
                <div key={index}>
                    {item.name} ${item.price} x {item.quantity}
                    <div className="flex text-neutral-400" key={index}> note : {item.specialInstructions} {item.note}</div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OrdersPage;
