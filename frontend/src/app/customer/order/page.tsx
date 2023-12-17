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
import { ItemDb } from "@/lib/types/db";

type StoreInfo = {
  area: string;
  category: number;
  emailAddress: string;
  favoriteCount: number;
  id: number;
  name: string;
  phoneNumber: string;
  storeImage: string;
  userId: number;
};

interface Orders{
  id: number;
  name: string;
  orderItem: ItemDb[];
  payment: string;
  status: string;
  pickupTime: string;
  storeId: number;
  storeInfo: StoreInfo;
};
const OrdersPage = () => {
  const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [orderData, setOrders] = useState<Orders[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { __session: accessToken = '' } = cookies;
  useEffect(() => {
    getOrders(accessToken)
      .then(data => {
        setOrders(data); // Assuming 'data' is the array of orders
        console.log(data);
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
              {order.orderItem && order.orderItem.map((item, index) => (
                <div key={index}>
                  {item.name} x {item.quantity} ${item.payment}
                  <div className="flex text-neutral-400" key={index}>
                    note : {item.specialInstructions || item.note ? (item.specialInstructions) : 'empty'}
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
