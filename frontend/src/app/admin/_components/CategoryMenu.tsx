import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import { Utensils } from "lucide-react";
import { CardComponent } from "./CardComponent";
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
    categorys: CategoryProps[];
    defaultId: number;
}

const CategoryMenu: React.FC<TabsDemoProps> = ({ categorys, defaultId }) => {
    const [cookies] = useCookies(['refreshToken', 'accessToken', '__session']);
    const { __session: accessToken = '' } = cookies;
    const [loading, setLoading] = useState(true);
    const [categoryOption, setCategoryOption] = useState<number>(defaultId);
    const [restaurants, setRestaurants] = useState<MenuCategory[]>([]);
    const [restaurantCount, setRestaurantCount] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryOption, categorys]);

    const fetchRestaurants = async () => {
        try {
            const results = await Promise.all(categorys.map(category =>
                getStores(accessToken, category.id).then(data => ({
                    categoryName: category.categoryName,
                    items: data,
                    count: category.id === categoryOption ? data.length : 0
                }))
            ));
            setRestaurants(results);
            if (categoryOption === 0) { // Assuming '0' is the ID for "All"
                // Sum up counts for all categories
                const totalCount = results.reduce((acc, curr) => acc + curr.count, 0);
                setRestaurantCount(totalCount);
            } else {
                // Calculate the count for the specified category
                const totalCount = results.reduce((acc, curr) => curr.count > 0 ? curr.count : acc, 0);
                setRestaurantCount(totalCount);
            }
        } catch (err) {
            console.error('Error fetching stores:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategory = (value: string) => {
        const id = value === 'all' ? 0 : categorys.find((category) => category.categoryName === value)?.id || 0;
        setCategoryOption(id);
    }

    const idToName = (id: number) => {
        return categorys.find((category) => category.id === id)?.categoryName;
    }

    const renderCategoryHeader = () => (
        <div className="flex justify-between gap-4">
            <h1 className="text-black text-3xl font-semibold mt-3">
                {categoryOption ? idToName(categoryOption) : "All"}
            </h1>
            {categoryOption!==0 && (
                <div className="flex gap-2">
                    <div className="text-red-600 text-2xl font-black mt-5">
                        <Utensils />
                    </div>
                    <div className="text-red-600 text-2xl mt-4">
                        {restaurantCount}  
                    </div>
                </div>
            )}
        </div>
    );

    const renderTabsTriggers = () => (
        <>
            <TabsTrigger value="all">All</TabsTrigger>
            {categorys.map((category) => (
                <TabsTrigger key={category.id} value={category.categoryName}>
                    {category.categoryName}
                </TabsTrigger>
            ))}
        </>
    );

    const renderRestaurantCards = (items:RestaurantProps[]) => (
        items.map((item, index) => (
            <div key={index} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                <CardComponent id={item.id} uri={item.storeImage || ''} name={item.name} starNumber={item.favoriteCount} />
            </div>
        ))
    );

    return (
        <>
            <article className="self-stretch flex w-full items-stretch justify-between gap-5 max-md:max-w-[80%] max-md:flex-wrap ">
                {renderCategoryHeader()}
            </article>
            <Tabs className="w-full" defaultValue={'all'} onValueChange={handleCategory}>
                <TabsList className="grid grid-flow-col mt-6 overflow-x-auto" style={{ gridAutoColumns: 'minmax(100px, 1fr)' }}>
                    {renderTabsTriggers()}
                </TabsList>

                <TabsContent value="all">
                    <div className="flex flex-wrap w-full mt-6">
                        {restaurants.length ? renderRestaurantCards(restaurants.flatMap(category => category.items)) : <div className="flex justify-center items-center w-full h-96">No items in this category</div>}
                    </div>
                </TabsContent>

                {restaurants.map((category, index) => (
                    <TabsContent key={index} value={category.categoryName}>
                        <div className="flex flex-wrap w-full mt-6">
                            {renderRestaurantCards(category.items)}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
};

export default CategoryMenu;
