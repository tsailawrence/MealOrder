'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardProps } from '@/lib/types/db';
import { Heart } from 'lucide-react';

export const CardComponent: React.FC<CardProps> = ({id, uri, name, starNumber, likes = true}) => {

    return (
        <Link href={`/customer/restaurant/${id}`} >
            <div className="flex flex-col items-center w-[95%] max-w-xs mx-auto bg-white rounded-2xl overflow-hidden shadow-lg ">
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
                            {likes ? <Heart fill='red' /> : <Heart />}
                        </span>
                        <span className="text-red-600 text-xl">
                            {starNumber}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

