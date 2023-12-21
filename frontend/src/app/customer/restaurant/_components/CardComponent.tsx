'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardProps, CardPriceProps } from '@/lib/types/db';
import { Heart } from 'lucide-react';

type Item = {
    name: string;
    price: number;
    quantity: number;
}
type Cart = {
    reastaurantName: string;
    imageSrc: string; //restaurant image
    username: string;
    pickupTime: Date;
    status: string;
    item: Item[]; //item name, price, quantity
}
const ItemTemplate = {
    name: '',
    price: 0,
    quantity: 0,
    flavor: '',
    note: '',
}
const CartTemplate = {
    reastaurantName: '',
    imageSrc: null, //restaurant image
    username: '',
    pickupTime: new Date(),
    status: '',
    item:[], //item name, price, quantity
}

export const CardComponent: React.FC<CardProps> = ({ id, uri, name, starNumber, likes = false }) => {
    const RestauarantId = id.toString();
    return (
        <Link href={`/customer/restaurant/${RestauarantId}`} >
            <div className="flex flex-col items-center w-full max-w-xs mx-auto bg-white rounded-2xl overflow-hidden shadow-lg max-md:w-full">
                <div className="w-full">
                    <div className="relative w-full h-0" style={{ paddingBottom: '84%' }}>
                        <Image
                            src={uri}
                            alt={name}
                            width={86}
                            height={86}
                            className="absolute w-full h-full"
                        />
                    </div>
                </div>
                <div className="px-4 py-5 w-full">
                    <h2 className="text-neutral-700 text-xl font-bold truncate">
                        {name}
                    </h2>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-red-600 text-2xl font-black">
                            {likes ? <Heart fill='red'/> : <Heart/>}
                        </span>
                        {/* <span className="text-red-600 text-xl">
                            {starNumber}
                        </span> */}
                    </div>
                </div>
            </div>
        </Link>
    );
};

