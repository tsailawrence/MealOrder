import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import { Utensils } from "lucide-react";
import { CardComponent } from "@/app/customer/allFavorite/_components/CardComponent";
import { useCookies } from 'react-cookie';
import { getStores } from './actions';
import { CategoryProps } from "@/lib/types/db";

type RestaurantProps = {
    id: number;
    storeImage: string;
    name: string;
    favoriteCount: number;
    likes: boolean;
};

interface MenuCategory {
    categoryName: string;
    items: RestaurantProps[];
}

// Define the structure of the restaurant data
interface TabsDemoProps {
    category: CategoryProps[];
    defaultId: number;
    defaultValue: string;
}

// Define the props for TabsDemo component

const CategoryMenu: React.FC<TabsDemoProps> = ({ category, defaultId, defaultValue }) => {
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
    const [loading, setLoading] = useState(true);
    const { __session: accessToken = '' } = cookies;
    const [categoryOption, setCategory] = useState<number>(defaultId);
    const [restaurant, setRestaurant] = useState<MenuCategory[]>([]);
    const [restaurantNum, setRestaurantNum] = useState<number>(0);
    useEffect(() => {
        // getStores(accessToken) get all store info
        setRestaurant([]);
        category.map((category) => (
            getStores(accessToken, category.id)
                .then(data => {
                    setRestaurant((restaurant) => [...restaurant, { categoryName: category.categoryName, items: data }]);
                    if (category.id === categoryOption) {
                        setRestaurantNum(data.length);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching orders:', err);
                }))
        );

    }, [accessToken, category, categoryOption]); // Dependency array
    const handleCategory = (value: string) => {
        //find id by name
        const id = category.find((category) => category.categoryName === value)?.id;
        setCategory(id || 0);
    }
    return (
        <>
            <article className="self-stretch flex w-full items-stretch justify-between gap-5 max-md:max-w-[80%] max-md:flex-wrap ">
                <div className="flex items-stretch justify-between gap-5">
                    <div className="flex grow basis-[0%] flex-col items-stretch mt-2.5 self-start">
                        <div className="flex justify-between gap-4">
                            <h1 className="text-black text-3xl font-semibold mt-3">
                                {categoryOption ? category.find((category) => category.id === categoryOption)?.categoryName : "All"}
                            </h1>
                            { categoryOption ? <div className="flex gap-2">
                                <div className="text-red-600 text-2xl font-black mt-5">
                                    <Utensils />
                                </div>
                                <div className="text-red-600 text-2xl mt-4">
                                    {restaurantNum}
                                </div>
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            </article>
            <Tabs className="w-full" defaultValue={defaultValue} onValueChange={(value) => handleCategory(value)}>
                <TabsList
                    className="grid grid-flow-col mt-6 overflow-x-auto"
                    style={{ gridAutoColumns: 'minmax(100px, 1fr)' }}
                >
                    <TabsTrigger value="all" >All</TabsTrigger>
                    {category.map((category) => (
                        <TabsTrigger key={category.id} value={category.categoryName}>{category.categoryName}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" >
                    <div className="flex flex-wrap w-full mt-6">
                        {restaurant.map((category, index) => (
                            category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                                    <CardComponent id={item.id} uri={item.storeImage ? item.storeImage : ''} name={item.name} starNumber={item.favoriteCount} />
                                </div>
                            ))
                        ))}
                    </div>
                </TabsContent>

                {restaurant.map((category, index) => (
                    <TabsContent key={index} value={category.categoryName}>
                        <div className="flex flex-wrap w-full mt-6">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                                    <CardComponent id={item.id} uri={item.storeImage ? item.storeImage : ''} name={item.name} starNumber={item.favoriteCount} />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
};

export default CategoryMenu;
