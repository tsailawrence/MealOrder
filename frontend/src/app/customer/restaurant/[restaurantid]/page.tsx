"use client"
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'next/navigation';
import StoreInfo from './_components/StoreInfo';
import StoreMenu from './_components/StoreMenu';
import { getRestaurantData } from './_components/actions';

interface MenuItem {
    id: number;
    name: string;
    menuImage: string;
    description: string;
    price: number;
    storeId: number;
    menuTypeId: number;
    onShelfStatus: number;
    updated_time: string;
}

type menuType = {
    id: number,
    type: string
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
    menuTypes: menuType[];
    storeImage: string;
}

const RestaurantPage = () => {
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
    const { __session: accessToken = '' } = cookies;
    const { restaurantid } = useParams();
    const [restaurant, setRestaurant] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (restaurantid) {
            fetchRestaurantData(restaurantid.toString(), accessToken);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantid]);

    const fetchRestaurantData = async (id: string, token: string) => {
        setLoading(true);
        try {
            const data = await getRestaurantData(token, id);
            setRestaurant(data);
        } catch (err) {
            console.error('Error fetching restaurant data:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!restaurant) {
        return <div>No data</div>;
    }

    return (
        <>
            <StoreInfo 
                id={restaurant.id} 
                name={restaurant.name} 
                area={restaurant.area} 
                phoneNumber={restaurant.phoneNumber} 
                starNumber={restaurant.favoriteCount} 
                imageSrc={restaurant.storeImage || ''} 
            />
            {restaurant.menu && <StoreMenu restaurantName={restaurant.name} menus={restaurant.menu} menutypes={restaurant.menuTypes} />}
        </>
    );
};

export default RestaurantPage;