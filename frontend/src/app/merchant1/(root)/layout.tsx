import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getStore } from "@/app/merchant1/components/actions";

export default async function MerchantSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  const store = await getStore(userId);
  if (store) {
    redirect(`/merchant/${store.id}/menu`);
  }

  return <>{children}</>;
}
