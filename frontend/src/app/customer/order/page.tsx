import React from "react";
import styles from "./_components/orders.module.css";
import { OrderTable } from "./_components/OrderTable";
const orderData = [
  {
    id: 1,
    name: "美式餐酒館",
    items: 2,
    time: "10/28 9:05 AM",
    total: "NT$200.00",
    status: "Preparing",
    pickupTime: "10/28 9:15 AM",
  },
  {
    id: 2,
    name: "Donuts hut",
    items: 2,
    time: "10/28 8:15 AM",
    total: "NT$120.00",
    status: "Confirmed",
    pickupTime: "10/28 11:15 AM",
  },
  {
    id: 3,
    name: "美式餐酒館",
    items: 5,
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
      {orderData.map((order,index) => (
        <OrderTable key={index} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
