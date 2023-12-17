"use client"
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'next/navigation';
import CategoryMenu from './_components/CategoryMenu';
import { getCategorys } from './_components/actions';
import { CategoryProps } from '@/lib/types/db';
import { ca } from 'date-fns/locale';

const RestaurantPage = () => {
    const { category } = useParams();
    const categoryString = category.toString();
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
    const [categoryData, setCategoryData] = useState<CategoryProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { __session: accessToken = '' } = cookies;
    useEffect(() => {
        getCategorys(accessToken)
            .then(data => {
                setCategoryData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
            });
    }, [accessToken]); // Dependency array
    // Use 'id' to fetch data or for other purposes
    return (
        <>
            {loading||categoryData===null ? <div>Loading...</div> :
                (<CategoryMenu categorys={categoryData} defaultId={Number(categoryString)} />)
            }
        </>
    );
}


export default RestaurantPage;
