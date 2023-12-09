import * as React from "react";
import Image from "next/image";
import { RestaurantCardProps } from "@/lib/types/db";
import { Heart } from 'lucide-react';

const StoreInfo: React.FC<RestaurantCardProps> = ({
    name,
    imageSrc,
    starNumber,
    address,
    likes,
}) => {
    return (
        <article className="self-stretch flex w-full items-stretch justify-between gap-5 max-md:max-w-[80%] max-md:flex-wrap ">
            <div className="flex items-stretch justify-between gap-5 mt-2">
                <Image
                    loading="lazy"
                    src={imageSrc}
                    width={86}
                    height={86}
                    className="object-contain object-center w-[90px] h-[90px] justify-center items-center overflow-hidden shrink-0 max-w-full rounded-full mt-1" // Added h-[86px] and rounded-full
                    alt="Restaurant Image"
                />
                <div className="flex grow basis-[0%] flex-col items-stretch mt-2.5 self-start">
                    <div className="flex justify-between gap-4">
                        <h1 className="text-black text-3xl font-semibold leading-10">
                            {name}
                        </h1>
                        <div className="flex gap-2 mt-2">
                            <div className="text-red-600 text-2xl font-black leading-6">
                                {likes ? <Heart fill='red' /> : <Heart />}
                            </div>
                            <div className="text-red-600 text-2xl leading-7 self-stretch whitespace-nowrap">
                                {starNumber}
                            </div>
                        </div>
                    </div>
                    <p className="text-neutral-400 text-base leading-6 whitespace-nowrap mt-2">
                        {address}
                    </p>
                </div>
            </div>
            <div className="justify-center items-stretch border border-[color:var(--Red,#E60012)] flex gap-2 mt-4 pl-8 pr-8 py-3 rounded-3xl border-solid self-start ">
                <Image
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/61e469bf-3fa4-4814-928e-fdf1a9b6b529?apiKey=5d949b60a548481d8fbc5fec7da626b0"
                    width={5}
                    height={5}
                    className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                    alt="Favorite Icon"
                />
                <div className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap">
                    <a href="#">Add to favorite</a>
                </div>
            </div>
        </article>
    );
};

export default StoreInfo;
