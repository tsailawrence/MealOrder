"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import { useStoreModal } from "@/hooks/use-store-modal";
import { getStore } from "@/app/merchant/components/actions";

const MerchantSetupPage = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  const storeInfoCheck = async () => {
    const { __session: accessToken = "" } = cookies;

    const store = await getStore(accessToken);
    if (store) {
      router.push(`/merchant/${store.id}/menu`);
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    storeInfoCheck();
  }, [isOpen, cookies]);

  return null;
};

export default MerchantSetupPage;
