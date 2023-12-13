"use client";
// pages/payments.tsx
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getMyCurrentMonthPayment } from "./_components/actions";
import styles from "./_components/payments.module.css";
import { Skeleton } from "@/components/ui/skeleton";
interface PaymentDetail {
  restaurant: string;
  orderTimes: number;
  totalCosts: number;
}

const paymentData: PaymentDetail[] = [
  { restaurant: "好吃餐廳", orderTimes: 1, totalCosts: 150.00 },
  { restaurant: "五力餐廳", orderTimes: 3, totalCosts: 400.00 },
  // ... other data ...
];

const PaymentsPage: React.FC = () => {
  const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [payments, setPayments] = useState<PaymentDetail[] | null>(paymentData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const { __session: accessToken = '' } = cookies;
  useEffect(() => {
    getMyCurrentMonthPayment(accessToken)
      .then(data => {
        setPayments(data); // Assuming 'data' is the array of orders
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
  }, [accessToken])
  useEffect(() => {
    if (payments) {
      let sum = 0;
      let i = 0;
      paymentData.forEach((payment) => {
        sum += payment.totalCosts;
        i += payment.orderTimes;
      });
      setTotalRevenue(sum);
      setTotalOrders(i);
      setTotalCustomers(payments.length);
    }
  }, [payments]);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Payment</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.summary}>
          <div className={styles.totalCost}>
            <h2>Total Cost</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{`NT$${totalRevenue}`}</p>}
          </div>
          <div className={styles.orders}>
            <h2>Orders</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalOrders}</p>}
          </div>
          <div className={styles.restaurants}>
            <h2>Restaurants</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalCustomers}</p>}
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

            {loading ? <Skeleton className="w-full h-full rounded-lg" /> :
              (
                <tbody>
                  {paymentData ? paymentData.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.restaurant}</td>
                      <td>{detail.orderTimes}</td>
                      <td>{`NT$ ${detail.totalCosts}`}</td>
                      <td>
                        <button className={styles.viewButton}>View</button>
                      </td>
                    </tr>
                  )): <div>No data</div>}
                </tbody>
              )
            }

          </table>
        </section>
      </main>
    </div>
  );
};

export default PaymentsPage;
