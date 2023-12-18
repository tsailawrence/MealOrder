import React from "react";
import { ToastProvider } from "@/providers/toast-provider";
import MerchantHeader from "@/app/merchant/components/MerchantHeader";

export default async function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <ToastProvider />
        <MerchantHeader />
        {children}
      </div>
    </div>
  );
}
