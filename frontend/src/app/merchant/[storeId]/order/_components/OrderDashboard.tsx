"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

import { Order } from "@/lib/types/db";
import { getAllOrders, updateOrderStatus } from "./actions";
import { OrderCard } from "@/app/merchant/[storeId]/order/_components/OrderCard";
import { AllOrderTable } from "@/app/merchant/[storeId]/order/_components/AllOrderTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Define the props for TabsDemo component
export const Dashboard = () => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;

  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<Order[] | null>(null);

  const fetchAllOrders = () => {
    setLoading(true);
    getAllOrders(accessToken)
      .then((data) => {
        console.log("Orders:", data);
        setAllOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };

  useEffect(() => {
    fetchAllOrders();
    //eslint-disable-next-line
  }, []);

  const todayOrders =
    allOrders &&
    allOrders.filter((order) => {
      const today = new Date();
      const orderDate = new Date(order.pickupTime);
      return (
        today.toDateString() === orderDate.toDateString()
        // order.status !== "Canceled"
      );
    });

  console.log("todayOrders:", todayOrders);

  const upcomingOrders =
    allOrders &&
    allOrders.filter((order) => {
      const today = new Date();
      const orderDate = new Date(order.pickupTime);
      return (
        today.toDateString() < orderDate.toDateString()
        // order.status !== "Canceled"
      );
    });

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus(accessToken, orderId, status);
      fetchAllOrders();
      toast.success("Order status updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" px-9">
      <Tabs defaultValue="Today">
        <TabsList className="w-full">
          <TabsTrigger value="Today" className=" w-1/3">
            Today
          </TabsTrigger>
          <TabsTrigger value="Upcoming" className=" w-1/3">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="All_Orders" className=" w-1/3">
            All Orders
          </TabsTrigger>
        </TabsList>
        {loading ? (
          <div className="flex items-center space-x-4 mt-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="Today" className="grid grid-cols-4 gap-2 mt-4">
              {todayOrders ? (
                todayOrders.map((order, index) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    handleUpdate={handleUpdateOrderStatus}
                  />
                ))
              ) : (
                <div>No orders today</div>
              )}
            </TabsContent>
            <TabsContent
              value="Upcoming"
              className="grid grid-cols-4 gap-2 mt-3"
            >
              {upcomingOrders ? (
                upcomingOrders.map((order, index) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    handleUpdate={handleUpdateOrderStatus}
                  />
                ))
              ) : (
                <div>No upcoming orders</div>
              )}
            </TabsContent>
            <TabsContent value="All_Orders">
              {allOrders && <AllOrderTable orders={allOrders} />}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
