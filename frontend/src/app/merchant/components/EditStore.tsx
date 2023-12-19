"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";

import { getStore } from "@/app/merchant/components/actions";

import { Button } from "@/components/ui/button";
import { StoreModal } from "@/app/merchant/components/StoreModal";
import { Pencil } from "lucide-react";

const EditStore = () => {
  const [open, setOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState();
  const router = useRouter();
  const params = useParams();
  const { storeId } = params;
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);

  const storeInfoCheck = async () => {
    const { __session: accessToken = "" } = cookies;

    const store = await getStore(accessToken);
    if (store) {
      setStoreInfo(store);
      if (storeId !== store.id.toString()) {
        router.push(`/merchant/${store.id}/menu`);
      }
    } else {
      router.push(`/merchant`);
      setOpen(true);
    }
  };

  useEffect(() => {
    storeInfoCheck();
  }, [open, storeId]);

  return (
    <>
      <div className="text-2xl font-bold">
        {storeInfo ? storeInfo.name : "Loading..."}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          aria-label="Edit store"
        >
          <Pencil size={16} />
        </Button>
      </div>
      <StoreModal open={open} setOpen={setOpen} storeInfo={storeInfo} />
    </>
  );
};

export default EditStore;
