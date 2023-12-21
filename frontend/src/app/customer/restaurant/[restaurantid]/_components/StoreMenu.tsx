import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { CardPriceComponent } from "./CardPriceComponent";
import { MenuItem, menuType } from "@/lib/types/db";
// Define the structure of each category in the menu

// Define the structure of the restaurant data
interface TabsDemoProps {
    restaurantName: string;
    menus: MenuItem[];
    menutypes: menuType[];
}

// Define the props for TabsDemo component

const TabsDemo: React.FC<TabsDemoProps> = ({ restaurantName, menus, menutypes }) => {
    const menuTypeIdToName = (id: number) => {
        const menuTypeObj = menutypes.find((type) => type.id === id);
        return menuTypeObj?.type || '';
    }
    let defaultValue ='0';
    if (menus.length > 0) defaultValue = menus[0].menuTypeId.toString();
    return (
        <Tabs className="w-full" defaultValue={defaultValue}>
            <TabsList
                className="grid w-full grid-flow-col mt-6 overflow-x-auto"
                style={{ gridAutoColumns: 'minmax(100px, 1fr)' }}
            >
                {menutypes && menutypes.map((type, index) => (
                    <TabsTrigger key={index} value={type.id.toString()}>{menuTypeIdToName(type.id)}</TabsTrigger>
                ))}
            </TabsList>

            {menutypes && menutypes.map((type) => (
                <TabsContent key={type.id} value={type.id.toString()}>
                {
                    menus && menus.filter((item) => item.menuTypeId === type.id).length === 0 ?
                    <div className="flex justify-center items-center w-full h-96">No items in this category</div> :
                    <div className="flex flex-wrap w-full mt-6">
                        {
                            menus && menus.filter((item) => item.menuTypeId === type.id && item.onShelfStatus===1).map((item) => (
                                <div key={item.id} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px] mb-3">
                                    <CardPriceComponent 
                                        amount={item.amount}
                                        restaurantName={restaurantName} 
                                        storeId={item.storeId} 
                                        uri={item.menuImage ? item.menuImage : ''} 
                                        menuId={item.id}
                                        name={item.name} 
                                        price={item.price} 
                                        description={item.description} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                }
            </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabsDemo;
