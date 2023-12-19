import React from "react";
import OrderBar from "./OrderBar";
import { Item } from "@/lib/types/db";

interface OrderDetailsProps {
    pickUpTime: string;
    orderNumber: number;
    orderTime: string;
    items: Item[];
    status: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
    pickUpTime,
    orderNumber,
    orderTime,
    items,
    status,
}) => {
    const num = items.length;
    //add all the prices together
    const price = items.reduce((a, b) => a + b.price * b.quantity, 0);
    function statusColor(status: string) {
        switch (status) {
            case "Confirmed":
                return "bg-white text-green-400 border-green-500";
            case "Preparing":
                return "bg-white text-yellow-400 border-yellow-500";
            case "To Pick Up":
                return "bg-white text-blue-400 border-blue-500";
            case "Completed":
                return "bg-white text-purple-400 border-purple-500";
            case "Canceled":
                return "bg-white text-red-400 border-red-500";
            default:
                return "bg-white text-amber-500 border-amber-500";
        }
    }
    return (
        <div className="border bg-white flex w-full grow flex-col mx-auto pl-6 pr-6 py-5 rounded-lg border-solid border-black">
            <div className="text-black text-base font-medium leading-5 self-stretch">
                Pick Up Time: {pickUpTime}
            </div>
            <div className="text-black text-base font-medium leading-5 self-stretch mt-10">
                Order #{orderNumber}
            </div>
            <div className="text-zinc-500 text-sm leading-4 self-stretch mt-3.5">
                {orderTime}
            </div>
            <OrderBar items={items} />
            <div className="self-stretch flex items-stretch justify-between gap-5 mt-10 max-md:mt-10">
                <div className="text-zinc-500 text-sm leading-4">{num} Items</div>
                <div className="text-zinc-500 text-right text-sm leading-4">
                    Total {price}
                </div>
            </div>
            <div className="flex max-w-full items-stretch gap-3.5 mt-5 self-end">
                <div className="text-zinc-500 text-base font-medium justify-center items-center border bg-white grow px-5 py-2.5 rounded-3xl border-solid border-zinc-500">
                    Cancel
                </div>
                <div className={`text-base font-medium justify-center items-center px-5 py-2.5 rounded-3xl border border-solid ${statusColor(status)} grow`}>
                    {status}
                </div>
            </div>
        </div >
    );
};

export default OrderDetails;