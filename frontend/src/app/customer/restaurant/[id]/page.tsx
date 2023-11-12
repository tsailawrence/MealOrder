"use client"
import { useParams } from 'next/navigation';
import RestaurantCard from '@/components/StoreInfo';
import StoreMenu from '@/components/StoreMenu';
import { restaurantData } from '@/app/dbTemplate/cardData';

const RestaurantPage = () => {
    const { id } = useParams();
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            <RestaurantCard  name={restaurantData[0].name} address={restaurantData[0].address} starNumber={restaurantData[0].starNumber} imageSrc={restaurantData[0].uri} likes={true} />
            <StoreMenu menu={restaurantData[0].menu} />
        </>
    );
}

export default RestaurantPage;


