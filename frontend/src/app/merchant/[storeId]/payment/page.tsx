import { Heading } from "@/components/ui/heading";

import { MonthlyOrderData } from "@/app/merchant/[storeId]/payment/_components/MonthlyOrderData";

const PaymentPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <div className="p-5">
      <div className="flex items-center gap-5  py-5 px-10">
        <Heading title={`Payment`} description="View monthly data here." />
      </div>
      <MonthlyOrderData />
    </div>
  );
};

export default PaymentPage;
