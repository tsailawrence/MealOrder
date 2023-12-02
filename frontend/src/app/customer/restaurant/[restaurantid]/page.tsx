"use client"
import { useParams } from 'next/navigation';
import StoreInfo from './_components/StoreInfo';
import StoreMenu from './_components/StoreMenu';
import { restaurantData } from '@/app/dbTemplate/cardData';

const RestaurantPage = () => {
    const { id } = useParams();
    console.log(id);
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            <StoreInfo  name={restaurantData[0].name} address={restaurantData[0].address} starNumber={restaurantData[0].starNumber} imageSrc={restaurantData[0].uri} likes={true} />
            <StoreMenu restaurantName={restaurantData[0].name} menu={restaurantData[0].menu} />
        </>
    );
}

export default RestaurantPage;


