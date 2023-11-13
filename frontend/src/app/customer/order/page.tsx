import React from "react";
import styles from "./orders.module.css";

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
      {orderData.map((order) => (
        <div key={order.id} className={styles.orderItem}>
          <img
            className={styles.image}
            src="https://via.placeholder.com/86"
            alt={order.name}
          />
          <div className={styles.details}>
            <h2 className={styles.title}>{order.name}</h2>
            <p
              className={styles.info}
            >{`${order.items} items, ${order.time}, Total ${order.total}`}</p>
          </div>
          <div>
            <div className={styles.pickup}>
              <div>Pickup Time: {order.pickupTime}</div>
            </div>
            <div className={styles.status}>
              <span
                className={`${styles.statusBadge} ${
                  styles[order.status.toLowerCase()]
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
