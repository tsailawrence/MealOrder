import React from "react";
import styles from "./orders.module.css";
import Image from "next/image";
import Link from "next/link";
import { ItemDb } from "@/lib/types/db";
interface Orders {
  id: number;
  name: string;
  orderItem: ItemDb[];
  payment: string;
  status: string;
  pickupTime: string;
  storeId: number;
};
function formatStatusForClass(status:string) {
  return status.toLowerCase().replace(/\s+/g, '_');
}

export const OrderTable = ({ order }: { order: Orders }) => {
  let itemnumber = 0;
  if (order.orderItem) itemnumber = order.orderItem.length;
  console.log(order);
  return (
    <div key={order.id} className={styles.orderItem}>
      <Image
        className={styles.image}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100"
        width={86}
        height={86}
        alt={order.name}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>
          {order.storeId}
        </h2>
        <Link href={`/customer/restaurant/${order.storeId}`}>
          <span className="bg-red-400 text-white text-xs rounded-full p-1"> order again </span>
        </Link>
        <p
          className={styles.info}
        >
          {`${itemnumber} items, ${order.pickupTime}`}
        </p>
        <p className={styles.info}>
          {`Total ${order.payment}`}</p>
      </div>
      <div>
        <div className={styles.pickup}>
          <div>Pickup : <br/>{order.pickupTime}</div>
        </div>
        <div className={styles.status}>
          <span
            className={`${styles.statusBadge} ${styles[formatStatusForClass(order.status)]}`}
          >
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
};