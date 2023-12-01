import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { CardComponent}from "@/components/CardComponent";
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
    return (
            <Tabs className="w-full" defaultValue={defaultValue}>
                <TabsList className="grid w-full grid-flow-row-dense mt-6 auto-cols-min" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
                <TabsTrigger value="all" >All</TabsTrigger>
                    {menu.map((category, index) => (
                        <TabsTrigger key={index} value={category.categoryName}>{category.categoryName}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" >
                        <div className="flex flex-wrap gap-5 w-full px-5 mt-6">
                            {menu.map((category, index) => (
                                category.restaurant.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex-none w-1/4 min-w-[150px] max-w-[200px]">
                                        <CardComponent uri={item.uri} name={item.name} starNumber={item.starNumber} likes={item.likes} />
                                    </div>
                                ))
                            ))}
                        </div>
                </TabsContent>
                {menu.map((category, index) => (
                    <TabsContent key={index} value={category.categoryName}>
                        <div className="flex flex-wrap gap-5 w-full px-5 mt-6">
                            {category.restaurant.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex-none w-1/4 min-w-[150px] max-w-[200px]">
                                    <CardComponent uri={item.uri} name={item.name} starNumber={item.starNumber} likes={item.likes} />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
    );
};

export default CategoryMenu;
