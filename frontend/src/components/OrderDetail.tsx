import React from "react";
import OrderBar from "./OrderBar";
import { Item } from "@/lib/types/db";

interface OrderDetailsProps {
    pickUpTime: string;
    orderNumber: string;
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
    return (
        <div className="border bg-white flex w-full grow flex-col mx-auto pl-6 pr-6 py-5 rounded-lg border-solid border-black border-opacity-50 max-md:mt-8 max-md:px-5">
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
            <div className="flex w-[231px] max-w-full pr-0 items-stretch gap-3.5 mt-7 self-end">
                <div className="text-zinc-500 text-base font-medium leading-6 whitespace-nowrap justify-center items-center border bg-white grow px-5 py-2.5 rounded-3xl border-solid border-zinc-500">
                    Cancel
                </div>
                <div className="text-amber-500 text-base font-medium leading-6 whitespace-nowrap justify-center items-center border bg-white z-[1] grow px-5 py-2.5 rounded-3xl border-solid border-amber-500">
                    {status}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;