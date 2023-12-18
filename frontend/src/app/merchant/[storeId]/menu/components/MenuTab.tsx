"use client";

import React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TabsTrigger } from "@/components/ui/tabs2";
import { Pencil, Trash2 } from "lucide-react";

export type MenuTabProps = {
  categoryId: string;
  categoryName: string;
  onEdit?: () => void;
  onDelete: () => void;
};

export const MenuTab: React.FC<MenuTabProps> = ({
  categoryId,
  categoryName,
  onEdit,
  onDelete,
}) => {
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
