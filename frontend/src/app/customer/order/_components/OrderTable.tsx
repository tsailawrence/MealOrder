import React from "react";
import styles from "./orders.module.css";
import Image from "next/image";

type Order = {
    id: number;
    name: string;
    items: number;
    time: string;
    total: string;
    status: string;
    pickupTime: string;
};
export const OrderTable = ({ order }: { order: Order }) => {
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
  );
};