"use client";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getMyCurrentMonthPayment } from "./_components/actions";
import styles from "./_components/payments.module.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type orderItem = {
  id: number;
  menuId: number;
  name: string;
  orderId: number;
  payment: number;
  quantity: number;
  specialInstructions: string;
};

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

interface PaymentDetail {
  storeId: number;
  orderTime: number;
  payment: number;
  storeInfo: StoreInfo;
  pickupTime: string;
  orderItem: orderItem[];
}

const groupPaymentsByRestaurant = (payments: PaymentDetail[]) => {
  const grouped = payments.reduce((acc, cur) => {
    const name = cur.storeInfo.name;
    if (!acc[name]) {
      acc[name] = { ...cur, payment: 0, orderTime: 0 };
    }
    acc[name].payment += cur.payment;
    acc[name].orderTime += 1;
    return acc;
  }, {} as Record<string, PaymentDetail>);

  return Object.values(grouped);
};


const PaymentsPage: React.FC = () => {
  const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [payments, setPayments] = useState<PaymentDetail[]>([]);
  const groupedPayments = groupPaymentsByRestaurant(payments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { __session: accessToken = '' } = cookies;
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const selectedRestaurantOrders = payments.filter(payment => payment.storeInfo.name === selectedRestaurant);

  const handleViewClick = (restaurantName: string) => {
    setSelectedRestaurant(restaurantName);
  };


  useEffect(() => {
    if (!accessToken) return;
    if (groupedPayments.length > 0) return;
    getMyCurrentMonthPayment(accessToken)
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      });
  }, [accessToken]);

  const totalCost = payments.reduce((acc, cur) => acc + cur.payment, 0);
  const totalOrders = payments.length;
  const totalRestaurants = new Set(payments.map(p => p.storeId)).size; // Unique store IDs

  return (
    <Dialog>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Payments Summary</h1>
      </header>
      <main className={styles.main}>
        {error && <p className={styles.error}>Error: {error}</p>}
        <section className={styles.summary}>
          <div className={styles.totalCost}>
            <h2>Total Cost</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{`NT$${totalCost}`}</p>}
          </div>
          <div className={styles.orders}>
            <h2>Orders</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalOrders}</p>}
          </div>
          <div className={styles.restaurants}>
            <h2>Restaurants</h2>
            {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalRestaurants}</p>}
          </div>
        </section>
        <section className={styles.tableSection}>
          {loading ? <Skeleton className="w-full h-full rounded-lg" /> :
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
                    {groupedPayments ? groupedPayments.map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.storeInfo.name}</td>
                        <td>{detail.orderTime}</td>
                        <td>{`NT$ ${detail.payment}`}</td>
                        <td>
                        <DialogTrigger asChild>
                          <Button
                            className={styles.viewButton}
                            onClick={() => handleViewClick(detail.storeInfo.name)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        </td>
                      </tr>
                    )) : <div>No data</div>}
                  </tbody>
                )
              }
            </table>
          }
        </section>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Orders</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedRestaurantOrders.map((orders, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-lg font-semibold">{orders.storeInfo.name}</div>
                <div className="text-sm text-neutral-400">{orders.orderItem.length} {orders.orderItem.length>1 ? "Items" :"Item"}</div>
                <div className="text-lg font-semibold">{`NT$ ${orders.payment}`}</div>
              </div>
              <div className="text-sm text-neutral-400">{orders.pickupTime}</div>
            </div>
          ))}
        </div>
      </DialogContent>
      </main>
    </div>
    </Dialog>
  );
};

export default PaymentsPage;
