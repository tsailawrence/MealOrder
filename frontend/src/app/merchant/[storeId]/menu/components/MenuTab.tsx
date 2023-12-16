"use client";

import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TabsTrigger } from "@/components/ui/tabs2";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteMenuType,
  updateMenuType,
} from "@/app/merchant/[storeId]/menu/components/actions";
import { useParams } from "next/navigation";

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
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;
  const params = useParams();

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
