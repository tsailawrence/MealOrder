"use client"
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryMenu from './_components/CategoryMenu';
import { getMenus} from './_components/actions';


const RestaurantPage = () => {
    const { category } = useParams();
    const categoryString = category.toString();
    const Menu = getMenus();
    // Use 'id' to fetch data or for other purposes
    return (
        <CategoryMenu menu={Menu} defaultValue={categoryString}/>
    );
} 


export default RestaurantPage;


