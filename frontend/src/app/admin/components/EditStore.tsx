"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";

import { getStore } from "@/app/admin/components/actions";

import { Button } from "@/components/ui/button";
import { StoreModal } from "@/app/admin/components/StoreModal";
import { Pencil } from "lucide-react";
import { StoreInfo } from "@/lib/types/db";

const EditStore = () => {
  const [open, setOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | undefined>();
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId?.toString();
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);

  const storeInfoCheck = async () => {
    const { __session: accessToken = "" } = cookies;

    const store = await getStore(accessToken);
    setStoreInfo(store);
  };

  useEffect(() => {
    storeInfoCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);
  console.log("storeInfo", storeInfo);

  return (
    <>
      <div className="text-2xl font-bold flex items-center gap-2">
        {storeInfo && (
          <Image
            src={
              storeInfo.storeImage !== null && storeInfo.storeImage !== ""
                ? storeInfo.storeImage
                : "https://via.placeholder.com/86x86.png?text=No+Image"
            }
            alt={"product image"}
            width={50}
            height={50}
          />
        )}

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
