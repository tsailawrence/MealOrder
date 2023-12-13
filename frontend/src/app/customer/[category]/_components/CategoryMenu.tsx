import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import React, { useState } from "react";
import { Utensils } from "lucide-react";
import { CardComponent } from "@/app/customer/allFavorite/_components/CardComponent";
type RestaurantProps = {
    uri: string;
    name: string;
    starNumber: number;
    likes: boolean;
};

// Define the structure of each category in the menu
interface MenuCategory {
    categoryName: string;
    restaurant: RestaurantProps[];
}

// Define the structure of the restaurant data
interface TabsDemoProps {
    menu: MenuCategory[];
    defaultValue: string;
}

// Define the props for TabsDemo component

const CategoryMenu: React.FC<TabsDemoProps> = ({ menu, defaultValue }) => {
    const [category, setCategory] = useState<string>(defaultValue);
    const [restaurantNum, setRestaurantNum] = useState<number>(0);
    return (
        <>
        <article className="self-stretch flex w-full items-stretch justify-between gap-5 max-md:max-w-[80%] max-md:flex-wrap ">
            <div className="flex items-stretch justify-between gap-5">
                <div className="flex grow basis-[0%] flex-col items-stretch mt-2.5 self-start">
                    <div className="flex justify-between gap-4">
                        <h1 className="text-black text-3xl font-semibold mt-3">
                            {category}
                        </h1>
                        <div className="flex gap-2">
                            <div className="text-red-600 text-2xl font-black mt-5">
                                <Utensils />
                            </div>
                            <div className="text-red-600 text-2xl mt-4">
                                {restaurantNum}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <Tabs className="w-full" defaultValue={defaultValue} onValueChange={(value)=>setCategory(value)}>
            <TabsList
                className="grid grid-flow-col mt-6 overflow-x-auto"
                style={{ gridAutoColumns: 'minmax(100px, 1fr)' }}
            >
                <TabsTrigger value="all" >All</TabsTrigger>
                {menu.map((category, index) => (
                    <TabsTrigger key={index} value={category.categoryName}>{category.categoryName}</TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="all" >
                <div className="flex flex-wrap w-full mt-6">
                    {menu.map((category, index) => (
                        category.restaurant.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                                <CardComponent uri={item.uri} name={item.name} starNumber={item.starNumber} likes={item.likes} />
                            </div>
                        ))
                    ))}
                </div>
            </TabsContent>
            {menu.map((category, index) => (
                <TabsContent key={index} value={category.categoryName}>
                    <div className="flex flex-wrap w-full mt-6">
                        {category.restaurant.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                                <CardComponent uri={item.uri} name={item.name} starNumber={item.starNumber} likes={item.likes} />
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
