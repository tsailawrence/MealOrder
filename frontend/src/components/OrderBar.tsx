
import React from "react";
import { Item } from "@/lib/types/db";


type OrdersProps = {
    items: Item[];
};

const OrderDetails: React.FC<OrdersProps> = ({ items }) => {
    return (
        <div className={`h-[200px] overflow-auto`}>
            {items.map((item: Item, index: number) => (
                //add margin
                <div
                    className="self-stretch flex items-center justify-between gap-5 mt-6 max-md:justify-center"
                    key={index}
                >
                    <div className="text-black text-base font-medium leading-6 whitespace-nowrap justify-center border border-[color:var(--base-dark-line,#393C49)] bg-white aspect-square my-auto px-4 py-2 rounded-lg border-solid">
                        {item.quantity}
                    </div>
                    <div className="self-stretch flex grow flex-col items-stretch">
                        <div className="text-black text-base">{item.name}</div>
                        <div className="text-zinc-500 text-sm leading-4 mt-4">
                            {item.specialInstructions}
                        </div>
                    </div>
                    <div className="text-black text-right text-base leading-5 grow whitespace-nowrap self-end">
                        ${item.price * item.quantity}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;