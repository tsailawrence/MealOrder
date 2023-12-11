"use client";

import React from "react";
import { toast } from "react-hot-toast";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMenuCategory } from "@/app/merchant1/[storeId]/menu/components/actions";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useParams } from "next/navigation";

export type MenuTabProps = {
  categoryId: string;
  categoryName: string;
};

export const MenuTab: React.FC<MenuTabProps> = ({
  categoryId,
  categoryName,
}) => {
  const params = useParams();
  const categoryModal = useCategoryModal();

  const onEdit = () => {
    console.log("edit");
    categoryModal.isEdit = true;
    categoryModal.categoryId = categoryId;
    categoryModal.categoryName = categoryName;
    categoryModal.onOpen();
  };
  const onDelete = async () => {
    console.log("delete");
    try {
      await deleteMenuCategory(params.storeId, categoryId);

      window.location.reload();
      toast.success("Category deleted");
    } catch (error) {
      toast.error("Something went wrong deleting the category");
      console.log(error);
    }
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TabsTrigger value={categoryId}>{categoryName}</TabsTrigger>
      </ContextMenuTrigger>
      <ContextMenuContent className=" w-10">
        <ContextMenuItem className="gap-2" onClick={onEdit}>
          <Pencil size={14} />
          Edit
        </ContextMenuItem>
        <ContextMenuItem className="gap-2" onClick={onDelete}>
          <Trash2 size={14} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
