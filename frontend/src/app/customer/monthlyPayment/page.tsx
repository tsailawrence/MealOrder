"use client";
// // pages/payments.tsx
// import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { getMyCurrentMonthPayment } from "./_components/actions";
// import styles from "./_components/payments.module.css";
// import { Skeleton } from "@/components/ui/skeleton";
// import { set } from "date-fns";
// interface PaymentDetail {
//   storeId: number;
//   payment: number;
// }

// const PaymentsPage: React.FC = () => {
//   const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session']);
//   const [payments, setPayments] = useState<PaymentDetail[] | null>(null);
//   const [totalCost, setTotalCost] = useState<number>(0);
//   const [totalOrders, setTotalOrders] = useState<number>(0);
//   const [totalRestaurant, setTotalRestaurant] = useState<number>(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { __session: accessToken = '' } = cookies;
//   useEffect(() => {
//     if (!accessToken) return;
//     if (payments) return;
//     setLoading(true);
//     getMyCurrentMonthPayment(accessToken)
//       .then(data => {
//         setPayments(data); // Assuming 'data' is the array of orders
//         setTotalCost(payments.reduce((acc, cur) => acc + cur.payment, 0));
//         setTotalOrders(payments.length);
//         setTotalRestaurant(payments.length);
//         console.log(payments);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching orders:', err);
//         setError(err);
//         setLoading(false);
//       });
//   }, [accessToken, payments]); // Dependency array

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <h1>Payment</h1>
//       </header>
//       <main className={styles.main}>
//         <section className={styles.summary}>
//           <div className={styles.totalCost}>
//             <h2>Total Cost</h2>
//             {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{`NT$${totalCost}`}</p>}
//           </div>
//           <div className={styles.orders}>
//             <h2>Orders</h2>
//             {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalOrders}</p>}
//           </div>
//           <div className={styles.restaurants}>
//             <h2>Restaurants</h2>
//             {loading ? <Skeleton className="w-[80px] h-[40px] rounded-lg" /> : <p>{totalRestaurant}</p>}
//           </div>
//         </section>
//         <section className={styles.tableSection}>
//           <table className={styles.paymentTable}>
//             <thead>
//               <tr>
//                 <th>RESTAURANT</th>
//                 <th>ORDER TIMES</th>
//                 <th>TOTAL COSTS</th>
//                 <th>DETAIL</th>
//               </tr>
//             </thead>

//             {loading ? <Skeleton className="w-full h-full rounded-lg" /> :
//               (
//                 <tbody>
//                   {payments ? payments.map((detail, index) => (
//                     <tr key={index}>
//                       <td>{detail.storeId}</td>
//                       <td>{1}</td>
//                       <td>{`NT$ ${detail.payment}`}</td>
//                       <td>
//                         <button className={styles.viewButton}>View</button>
//                       </td>
//                     </tr>
//                   )): <div>No data</div>}
//                 </tbody>
//               )
//             }

//           </table>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default PaymentsPage;

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getMyCurrentMonthPayment } from "./_components/actions";
import styles from "./_components/payments.module.css";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentDetail {
  storeId: number;
  payment: number;
}

const PaymentsPage: React.FC = () => {
  const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [payments, setPayments] = useState<PaymentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { __session: accessToken = '' } = cookies;

  useEffect(() => {
    if (!accessToken) return;
    if (payments.length > 0) return;
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
                  {payments ? payments.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.storeId}</td>
                      <td>{1}</td>
                      <td>{`NT$ ${detail.payment}`}</td>
                      <td>
                        <button className={styles.viewButton}>View</button>
                      </td>
                    </tr>
                  )): <div>No data</div>}
                </tbody>
              )
            }
            </table>
          }
        </section>
      </main>
    </div>
  );
};

export default PaymentsPage;
