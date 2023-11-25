import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Item } from "@/lib/types/db";
import OrderDetails from "@/components/OrderDetail";
import { orderData } from "../../dbTemplate/cardData";
import {DataTableDemo} from "@/components/allOrderTable";


// Define the props for TabsDemo component

const orderBox = () => {
    const defaultValue = "All_Orders";
    return (
        <Tabs className="w-full" defaultValue={defaultValue}>
            <TabsList className="grid w-full grid-cols-6 mt-6">
                <TabsTrigger value="Today">Today</TabsTrigger>
                <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="All_Orders">All Orders</TabsTrigger>
                <div className="col-span-7"></div>
            </TabsList>
            <TabsContent value="Today">
                <div className="flex justify-center">
                    <div className="flex flex-wrap gap-4 w-[90%] px-5 mt-6">
                        {orderData.map((order, index) => (
                            <div key={index} className="flex-none min-w-[150px]">
                                <OrderDetails pickUpTime={order.pickUpTime} orderNumber={order.orderNumber} orderTime={order.orderTime} items={order.items} totalPrice={order.totalPrice} status={order.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="Upcoming">
                <div className="flex justify-center">
                    <div className="flex flex-wrap gap-4 w-[90%] px-5 mt-6">
                        {orderData.map((order, index) => (
                            <div key={index} className="flex-none min-w-[150px]">
                                <OrderDetails pickUpTime={order.pickUpTime} orderNumber={order.orderNumber} orderTime={order.orderTime} items={order.items} totalPrice={order.totalPrice} status={order.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="All_Orders">
                <DataTableDemo />
            </TabsContent>
        </Tabs>
    );
};

export default orderBox;