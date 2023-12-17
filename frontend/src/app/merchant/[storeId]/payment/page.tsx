"use client";
import React, { useEffect, useState } from "react";
import styles from "./_components/payments.module.css";
import { useCookies } from "react-cookie";
import { getMyCurrentMonthPayment } from "./_components/actions";
interface PaymentDetail {
    employeeName: string;
    employeeId: string;
    orderTimes: number;
    totalCosts: string;
}

const paymentData: PaymentDetail[] = [
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'John', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
    { employeeName: 'Mary', employeeId: '123456', orderTimes: 5, totalCosts: 'NT$1,000' },
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
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                setError(err);
                setLoading(false);
            });
    }, [accessToken]); // Dependency array
    return (
        <>
            {loading ? <div> Loading... </div> :
                <div className={styles.container}>
                    <header className={styles.header}>
                        <h1>Payment</h1>
                    </header>
                    <main className={styles.main}>
                        <section className={styles.summary}>
                            <div className={styles.totalCost}>
                                <h2>Total Revenue</h2>
                                <p>NT$10,243.00</p>
                            </div>
                            <div className={styles.orders}>
                                <h2>Orders</h2>
                                <p>25</p>
                            </div>
                            <div className={styles.restaurants}>
                                <h2>Customers</h2>
                                <p>15</p>
                            </div>
                        </section>
                        <section className={styles.tableSection}>
                            <table className={styles.paymentTable}>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>ID</th>
                                        <th>ORDER TIMES</th>
                                        <th>TOTAL COSTS</th>
                                        <th>DETAIL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments ? payments.map((detail, index) => (
                                        <tr key={index}>
                                            <td>{detail.employeeName}</td>
                                            <td>{detail.orderTimes}</td>
                                            <td>{detail.employeeId}</td>
                                            <td>{detail.totalCosts}</td>
                                            <td>
                                                <button className={styles.viewButton}>View</button>
                                            </td>
                                        </tr>
                                    )) : (<tr><td>No data</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>}
        </>
    );
};

export default PaymentsPage;
