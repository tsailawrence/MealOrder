import { Heading } from "@/components/ui/heading";

import { Dashboard } from "@/app/merchant/[storeId]/order/_components/OrderDashboard";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <div className="flex items-center gap-5  py-5 px-10">
        <Heading title={`Order`} description="Manage your order here." />
      </div>
      <Dashboard />
    </>
  );
};

export default OrderPage;
