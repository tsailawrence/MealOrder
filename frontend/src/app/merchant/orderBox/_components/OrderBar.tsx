
import React from "react";
import { Item } from "@/lib/types/db";
import { Separator } from "@/components/ui/separator"; 


type OrdersProps = {
    items: Item[];
};

const OrderDetails: React.FC<OrdersProps> = ({ items }) => {
    return (
        <div className={`h-[200px] overflow-auto`}>
            {items.map((item: Item, index: number) => (
                //add margin
                <>
                <div
                    className="self-stretch flex items-center justify-between gap-3 mt-3 mr-3 max-md:justify-center "
                    key={index}
                >
                    <div className="text-black text-base font-medium leading-6 whitespace-nowrap justify-center border border-[color:var(--base-dark-line,#393C49)] bg-white aspect-square my-auto px-4 py-2 rounded-lg border-solid">
                        {item.quantity}
                    </div>
                    <div className="self-stretch flex grow flex-col items-stretch">
                        <div className="text-black text-base">{item.name}</div>
                        {item.specialInstructions&&<div className="text-zinc-500 text-sm leading-4 mt-4">
                            {item.specialInstructions.map((instruction, index) => (
                                <div key={index}>{instruction}</div>
                            ))}
                        </div>}
                    </div>
                    <div className="text-black text-right text-base leading-5 grow whitespace-nowrap self-end">
                        ${item.price * item.quantity}
                    </div>
                    
                </div>
                <Separator className="mt-3"/>
                </>
            ))}
        </div>
    );
};

export default OrderDetails;