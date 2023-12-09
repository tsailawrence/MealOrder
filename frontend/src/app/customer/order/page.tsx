"use client"
import React, { useState, useEffect } from "react";
import styles from "./_components/orders.module.css";
import { OrderTable } from "./_components/OrderTable";
import { useCookies } from "react-cookie";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerV2,
} from "@/components/ui/accordion"
import { getOrders } from "./_components/actions";
import { Item } from "@/lib/types/db";
type Order = {
  id: number;
  name: string;
  items: Item[];
  time: string;
  total: string;
  status: string;
  pickupTime: string;
};
const OrdersPage = () => {
  const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [orderData, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { __session: accessToken = '' } = cookies;
  useEffect(() => {
    getOrders(accessToken)
      .then(data => {
        setOrders(data); // Assuming 'data' is the array of orders
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
  }, [accessToken]); // Dependency array
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Orders</h1>
      {!loading ? (<Accordion type="single" collapsible className="w-full">
        {orderData ? (orderData.map((order, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`} className="w-full">
            <AccordionTriggerV2 className="w-full"><OrderTable key={index} order={order} /></AccordionTriggerV2>
            <AccordionContent >
              {order.items.map((item, index) => (
                <div key={index}>
                  {item.name} ${item.price} x {item.quantity}
                  <div className="flex text-neutral-400" key={index}>
                    note : {item.specialInstructions} {item.note}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))
        ) : (
          <div>no order</div>
        )}
      </Accordion>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default OrdersPage;
