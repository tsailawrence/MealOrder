"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/merchant/[storeId]/menu/components/actions";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/types/db";

const formSchema = z.object({
  name: z.string().min(1),
  menuImage: z.string().optional(),
  menuTypeId: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  amount: z.string().min(1).optional(),
});

type MenuType = {
  id: number;
  type: string;
};
interface ProductSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: () => void;
  productInfo: Product | undefined;
  menuTypes: MenuType[] | undefined;
}

export const ProductSheet = ({
  open,
  setOpen,
  onChange,
  productInfo,
  menuTypes,
}: ProductSheetProps) => {
  const [cookies] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;

  const params = useParams();
  const storeId = params.storeId?.toString();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) {
      if (productInfo) {
        form.reset({
          name: productInfo.name,
          menuImage: productInfo.menuImage,
          menuTypeId: productInfo.menuTypeId.toString(),
          description: productInfo.description,
          price: productInfo.price.toString(),
          amount: productInfo.amount?.toString(),
        }); 
      }
    } else {
      form.reset({
        name: "",
        menuImage: "",
        menuTypeId: "",
        description: "",
        price: "0",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, productInfo, form.reset, menuTypes]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (productInfo) {
        const newProduct = await updateProduct(
          accessToken,
          storeId,
          productInfo.id?.toString(),
          values
        );
        if (newProduct) {
          toast.success("Product updated");
        }
      } else {
        const newProduct = await createProduct(
          accessToken,
          storeId,
          values
        );
        if (newProduct) {
          toast.success("Product created");
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (productInfo) {
        await deleteProduct(accessToken, storeId, productInfo.id?.toString());
        toast.success("Product deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when deleting product");
    } finally {
      onChange();
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{productInfo ? "Edit Item" : "Add Item"}</SheetTitle>
        </SheetHeader>
        <div className="py-3">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="menuImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          disabled={loading}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result;
                                if (base64String) 
                                  form.setValue("menuImage", base64String?.toString());
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="None"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="menuTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {menuTypes?.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          aria-multiline
                          disabled={loading}
                          placeholder="None"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          disabled={loading}
                          placeholder="None"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remain Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          disabled={loading}
                          placeholder="None"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-5 space-x-2 flex items-center justify-end w-full">
                  {productInfo && (
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={loading}
                      className="mr-auto"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    type="button"
                    disabled={loading}
                    variant="outline"
                    onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
};
