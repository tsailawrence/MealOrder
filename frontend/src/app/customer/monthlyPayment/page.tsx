// pages/payments.tsx
import React from "react";
import styles from "./payments.module.css";

interface PaymentDetail {
  restaurant: string;
  orderTimes: number;
  totalCosts: string;
}

const paymentData: PaymentDetail[] = [
  { restaurant: "好吃餐廳", orderTimes: 1, totalCosts: "NT$150.00" },
  { restaurant: "五力餐廳", orderTimes: 3, totalCosts: "NT$400.00" },
  // ... other data ...
];

const PaymentsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Payment</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.summary}>
          <div className={styles.totalCost}>
            <h2>Total Cost</h2>
            <p>NT$10,243.00</p>
          </div>
          <div className={styles.orders}>
            <h2>Orders</h2>
            <p>25</p>
          </div>
          <div className={styles.restaurants}>
            <h2>Restaurants</h2>
            <p>15</p>
          </div>
        </section>
        <section className={styles.tableSection}>
          <table className={styles.paymentTable}>
            <thead>
              <tr>
                <th>RESTAURANT</th>
                <th>ORDER TIMES</th>
                <th>TOTAL COSTS</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.restaurant}</td>
                  <td>{detail.orderTimes}</td>
                  <td>{detail.totalCosts}</td>
                  <td>
                    <button className={styles.viewButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default PaymentsPage;
