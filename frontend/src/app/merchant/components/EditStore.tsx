"use client";

import { Button } from "@/components/ui/button";

import { useStoreModal } from "@/hooks/use-store-modal";

import { Pencil } from "lucide-react";

const EditStore = () => {
  const onOpen = useStoreModal((state) => state.onOpen);

  return (
    <div className="text-2xl font-bold">
      store
      <Button
        variant="outline"
        size="sm"
        onClick={onOpen}
        aria-label="Edit store"
      >
        <Pencil size={16} />
      </Button>
    </div>
  );
};

export default EditStore;
