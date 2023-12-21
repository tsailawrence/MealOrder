import * as React from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { RestaurantCardProps } from "@/lib/types/db";
import { Heart } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { addMyFavoriteRestaurant } from "./actions";
import { toast } from "react-hot-toast";

const StoreInfo: React.FC<RestaurantCardProps> = ({
    id,
    name,
    imageSrc,
    starNumber,
    phoneNumber,
    area,
}) => {
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session', 'nowCity']);
    const { __session: accessToken = '', nowCity } = cookies;
    const handleFavorite = () => {
        addMyFavoriteRestaurant(accessToken, id)
            .then(() => {
                toast.success('Add to favorite successfully');
            })
            .catch((err) => {
                toast.error('Add to favorite failed');
            });
    }
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
                                <Heart fill='red' />
                            </div>
                            {/* <div className="text-red-600 text-2xl leading-7 self-stretch whitespace-nowrap">
                                {starNumber}
                            </div> */}
                        </div>
                    </div>
                    {area && <span className="flex text-neutral-400 text-base whitespace-nowrap mt-1">
                        <MapPin /> {area}
                    </span>}
                    {(area && area !== nowCity) && <span className="text-red-600"> Far from your location !!!</span>}
                    {phoneNumber && <span className="flex text-neutral-400 text-base whitespace-nowrap mt-1">
                        <Phone /> {phoneNumber}
                    </span>}
                </div>
            </div>
            <div className="justify-center items-stretch border border-[color:var(--Red,#E60012)] flex gap-2 mt-4 pl-8 pr-8 py-3 rounded-3xl border-solid self-start ">
                <Image
                    loading="lazy"
                    src={imageSrc}
                    width={10}
                    height={10}
                    className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                    alt="Favorite Icon"
                />
                <div className="text-red-600 text-sm font-semibold leading-5 whitespace-nowrap">
                    <button type="button" className="text-red-600" onClick={() => handleFavorite()}>
                        Add to favorite
                    </button>
                </div>
            </div>
        </article>
    );
};

export default StoreInfo;
