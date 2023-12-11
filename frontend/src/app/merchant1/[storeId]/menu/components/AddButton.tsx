"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryModal } from "@/hooks/use-category-modal";

export const AddButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onOpen = useCategoryModal((state) => state.onOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="outline" className="gap-2">
        <Plus size={15} /> Add
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Plus size={15} /> Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem className="gap-2" onClick={onOpen}>
            <Plus size={12} /> Add Category
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={() => router.push(`/merchant/${params.storeId}/menu/new`)}
          >
            <Plus size={12} /> Add Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
