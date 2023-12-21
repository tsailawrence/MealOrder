'use client';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'next/navigation';
import StoreInfo from './_components/StoreInfo';
import StoreMenu from './_components/StoreMenu';
import { getRestaurantData } from './_components/actions';
import { MenuItem, menuType } from '@/lib/types/db';

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
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
  }, [accessToken, id]); // Dependency array
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : restaurant ? (
        <>
          <StoreInfo
            id={restaurant.id}
            name={restaurant.name}
            area={restaurant.area}
            phoneNumber={restaurant.phoneNumber}
            starNumber={restaurant.favoriteCount}
            imageSrc={restaurant.storeImage}
          />
          <StoreMenu
            restaurantName={restaurant.name}
            menus={restaurant.menu}
            menutypes={restaurant.menuTypes}
          />
        </>
      ) : (
        <div>No data</div>
      )}
    </>
  );
};

export default RestaurantPage;
