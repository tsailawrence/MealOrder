"use client"
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import StoreInfo from './_components/StoreInfo';
import StoreMenu from './_components/StoreMenu';
import { restaurantData } from '@/app/dbTemplate/cardData';
import { getRestaurantData } from './_components/actions';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    storeId: number;
    menuTypeId: number;
    amount: number;
    onShelfStatus: number;
    updated_time: string;
}

interface Store {
    id: number;
    name: string;
    userId: number;
    phoneNumber: number;
    emailAddress: string;
    area: string;
    favoriteCount: number;
    category: number;
    menu: MenuItem[];
}

const RestaurantPage = () => {
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [restaurant, setRestaurant] = useState<Store | null>(null);
    const { __session: accessToken = '' } = cookies;
    const { restaurantid } = useParams();
    const id = restaurantid.toString();

    useEffect(() => {
        getRestaurantData(accessToken, id)
            .then(data => {
                setRestaurant(data);
                console.log(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                setError(err);
                setLoading(false);
            });
    }, [accessToken, id]); // Dependency array
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            {loading ? <div>Loading...</div> :
                (restaurant ?
                    <>
                        <StoreInfo id={restaurant.id} name={restaurant.name} area={restaurant.area} phoneNumber={restaurant.phoneNumber} starNumber={restaurant.favoriteCount} imageSrc={restaurantData[0].uri}/>
                        <StoreMenu restaurantName={restaurantData[0].name} menu={restaurantData[0].menu} />
                    </>
                    : <div>No data</div>
                )
            }
        </>
    );
}

export default RestaurantPage;


