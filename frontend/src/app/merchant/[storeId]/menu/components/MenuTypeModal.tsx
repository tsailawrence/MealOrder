"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

import {
  createMenuType,
  updateMenuType,
} from "@/app/merchant/[storeId]/menu/components/actions";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  type: z.string().min(1),
});

type MenuType = {
  id: number;
  type: string;
};

interface MenuTypeModalProps {
  menuTypeInfo: MenuType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: () => void;
}

export const MenuTypeModal = ({
  open,
  setOpen,
  onChange,
  menuTypeInfo,
}: MenuTypeModalProps) => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;

  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) {
      if (menuTypeInfo) {
        form.reset({
          type: menuTypeInfo.type,
        });
      }
    } else {
      form.reset({
        type: "",
      });
    }
  }, [open, menuTypeInfo, form.reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (menuTypeInfo) {
        const menuType = await updateMenuType(
          accessToken,
          params.storeId,
          menuTypeInfo.id,
          values
        );
        if (menuType) {
          toast.success("Menu type updated");
        }
      } else {
        const menuType = await createMenuType(
          accessToken,
          params.storeId,
          values
        );
        if (menuType) {
          toast.success("Menu type updated");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when updating store");
    } finally {
      onChange();
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal
      title="Menu Type"
      description={menuTypeInfo ? "Edit Menu Type" : "Add Menu Type"}
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <div className="py-3">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Stroe Type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-5 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="button"
                  disabled={loading}
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
