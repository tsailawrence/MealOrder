"use client"
import React, { use, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryBar from './_components/CategoryBar';
import CategoryMenu from './_components/CategoryMenu';
import { getMenus} from './_components/actions';
import { restaurantData, categoryDetailData } from '@/app/dbTemplate/cardData';

const RestaurantPage = () => {
    const { category } = useParams();
    const categoryString = category.toString();
    const Menu = getMenus();
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            <CategoryBar  name='All' starNumber={restaurantData[0].starNumber} imageSrc={restaurantData[0].uri} likes={true} />
            <CategoryMenu menu={Menu} defaultValue={categoryString}/>
        </>
    );
} 


export default RestaurantPage;


