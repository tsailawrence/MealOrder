"use client";

import { Button } from "@/components/ui/button";

import { useStoreModal } from "@/hooks/use-store-modal";

import { Pencil } from "lucide-react";

const EditStoreIcon = () => {
  const onOpen = useStoreModal((state) => state.onOpen);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onOpen}
      aria-label="Edit store"
    >
      <Pencil size={16} />
    </Button>
  );
};

export default EditStoreIcon;
