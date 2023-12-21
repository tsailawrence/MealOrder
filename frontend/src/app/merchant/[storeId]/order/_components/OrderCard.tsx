"use client";
import { Order, OrderItem } from "@/lib/types/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: Order;
  handleUpdate: (orderId: number, status: string) => void;
}
function getStatus(status: string) {
  switch (status) {
    case "Confirmed":
      return {
        color: "text-red-400 border-red-400",
        action: ["Start Preparing", "Preparing"],
      };
    case "Preparing":
      return {
        color: "text-yellow-500 border-yellow-500",
        action: ["Complete Preparing", "To Pick Up"],
      };
    case "To Pick Up":
      return { color: "text-green-500 border-green-500", action: ["Pick Up","Completed"] };
    case "Completed":
      return {
        color: "text-blue-400 border-blue-400",
        action: null,
      };
    case "Canceled":
      return {
        color: "text-gray-400 border-gray-400",
        action: null,
      };
  }
  return null;
}
export const OrderCard = ({ order, handleUpdate }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className=" text-sm font-bold mb-4">
          Pick Up Time: {order.pickupTime}
        </div>
        <div className="flex w-full justify-between items-center">
          <div>
            <CardTitle>Order #{order.id}</CardTitle>
            <CardDescription>{order.time}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`${getStatus(order.status)?.color} text-xs`}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" h-[20vh] overflow-auto">
          {order.orderItems.map((item: OrderItem, index) => (
            <div key={index} className="w-full flex items-center border-b py-2">
              <Badge variant="secondary">{item.quantity}</Badge>
              <div className="ml-2 mr-auto">
                <div>{item.name}</div>
                <div className="text-gray-400 text-sm font-normal mt-1">
                  {item.specialInstructions}
                </div>
              </div>
              {/* <div>NT${item.payment}</div> */}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between items-center mt-4">
          <div className="text-gray-600 text-sm font-normal">
            {order.orderItems.length} items
          </div>
          <div className="text-gray-600 text-sm font-normal">
            Total: NT${order.payment}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            handleUpdate(order.id, "Canceled");
          }}
          disabled={order.status === "Canceled"}
        >
          {order.status === "Canceled" ? "Canceled" : "Cancel"}
        </Button>
        {getStatus(order.status)?.action && (
          <Button
            variant="destructive"
            onClick={() => {
              // Using optional chaining and nullish coalescing for safety
              {order.status && handleUpdate(order.id, getStatus(order.status)?.action?.[1] ?? "Preparing")}
            }}
          >
            {/* Safely accessing the first element of the action array */}
            {order.status && (getStatus(order.status)?.action?.[0] ?? "Preparing")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
