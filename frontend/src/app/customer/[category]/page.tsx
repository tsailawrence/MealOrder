"use client"
import React, { use, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryBar from './_components/CategoryBar';
import CategoryMenu from './_components/CategoryMenu';
import { getMenus} from './_components/actions';


const RestaurantPage = () => {
    const { category } = useParams();
    const categoryString = category.toString();
    const Menu = getMenus();
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            <CategoryBar  name='All' starNumber={200} imageSrc={"https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0"} likes={true} />
            <CategoryMenu menu={Menu} defaultValue={categoryString}/>
        </>
    );
} 


export default RestaurantPage;


