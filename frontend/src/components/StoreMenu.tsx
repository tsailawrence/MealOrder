import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { CardPriceComponent } from "@/components/CardComponent";

// Define the structure of the menu item
interface MenuItem {
    uri: string;
    name: string;
    price: number;
}

// Define the structure of each category in the menu
interface MenuCategory {
    categoryName: string;
    items: MenuItem[];
}

// Define the structure of the restaurant data
interface TabsDemoProps {
    menu: MenuCategory[];
}

// Define the props for TabsDemo component

const TabsDemo: React.FC<TabsDemoProps> = ({ menu }) => {
    const defaultValue = menu[0].categoryName;
    return (
            <Tabs className="w-full" defaultValue={defaultValue}>
                <TabsList className="grid w-full grid-cols-10 mt-6">
                    {menu.map((category, index) => (
                        <TabsTrigger key={index} value={category.categoryName}>{category.categoryName}</TabsTrigger>
                    ))}
                </TabsList>

                {menu.map((category, index) => (
                    <TabsContent key={index} value={category.categoryName}>
                        <div className="flex flex-wrap gap-5 w-full px-5 mt-6">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex-none w-1/4 min-w-[150px] max-w-[200px]">
                                    <CardPriceComponent uri={item.uri} name={item.name} price={item.price} />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
    );
};

export default TabsDemo;
