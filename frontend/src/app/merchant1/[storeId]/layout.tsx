import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getStore } from "@/app/merchant1/components/actions";

import MerchantHeader from "@/app/merchant1/components/MerchantHeader";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  const store = await getStore(userId);
  // if (!store) {
  //   //如果user沒有店，就跳到 /merchant 去新增商店
  //   redirect("/merchant");
  // } else if (store.id !== params.storeId) {
  //   //如果user有店，但不是這個目前網址的，就跳到這個user的店
  //   redirect(`/merchant/${store.id}/menu`);
  // }

  return (
    <>
      <MerchantHeader storeName={store.name} />
      {children}
    </>
  );
}
