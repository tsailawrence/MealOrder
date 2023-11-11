"use client"
import { useParams } from 'next/navigation';
import RestaurantCard from '@/components/StoreInfo';
import StoreMenu from '@/components/StoreMenu';
const RestaurantPage = () => {
    const { id } = useParams();
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            <RestaurantCard  name='aaa' address='aa davddv' starRating={5} imageSrc='https://cdn.builder.io/api/v1/image/assets/TEMP/61e469bf-3fa4-4814-928e-fdf1a9b6b529?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100' likes={true} />
            <StoreMenu />
            <p>Post ID: {id}</p>
        </>
    );
}

export default RestaurantPage;


