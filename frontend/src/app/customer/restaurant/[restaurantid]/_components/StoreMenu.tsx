import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { CardPriceComponent } from "./CardPriceComponent";
import { CardPriceProps } from "@/lib/types/db";

// Define the structure of each category in the menu
interface MenuCategory {
    categoryName: string;
    items: CardPriceProps[];
}

// Define the structure of the restaurant data
interface TabsDemoProps {
    restaurantName: string;
    menu: MenuCategory[];
}

// Define the props for TabsDemo component

const TabsDemo: React.FC<TabsDemoProps> = ({ restaurantName, menu }) => {
    const defaultValue = menu[0].categoryName;
    return (
        <Tabs className="w-full" defaultValue={defaultValue}>
            <TabsList
                className="grid w-full grid-flow-col mt-6 overflow-x-auto"
                style={{ gridAutoColumns: 'minmax(100px, 1fr)' }}
            >
                {menu.map((category, index) => (
                    <TabsTrigger key={index} value={category.categoryName}>{category.categoryName}</TabsTrigger>
                ))}
            </TabsList>

            {menu.map((category, index) => (
                <TabsContent key={index} value={category.categoryName}>
                    <div className="flex flex-wrap gap-5 w-full px-5 mt-6">
                        {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex-none w-1/4 min-w-[150px] max-w-[200px]">
                                <CardPriceComponent restaurantName={restaurantName} uri={item.uri} name={item.name} price={item.price} specialInstructions={item.specialInstructions} />
                            </div>
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabsDemo;
