"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { updateProduct } from "@/app/merchant/[storeId]/menu/components/actions";
import { parse } from "path";

const shelfStatus = [
  ///已下架
  { id: 0, status: "Archived" },
  ///販賣中
  {
    id: 1,
    status: "Available",
  },
  ///已售完
  {
    id: 2,
    status: "Sold Out",
  },
];

const formSchema = z.object({
  onShelfStatus: z.string().max(1),
});

type Product = {
  id: number;
  menuTypeId: number;
  uri: string;
  name: string;
  description: string;
  price: number;
  onShelfStatus: number;
};

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;

  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onShelfStatus: product.onShelfStatus.toString(),
    },
  });

  // 一旦選單狀態改變，就會觸發這個函式

  // useEffect(() => {
  //   if (form.formState.isDirty) {
  //     handleChangeStatus();
  //   }
  // }, [values: z.infer<typeof formSchema>]);
  const ChangeStatus = async () => {
    try {
      await updateProduct(accessToken, params.storeId, product.id, {
        onShelfStatus: parseInt(form.getValues("onShelfStatus")),
      });
      toast.success("Product updated");
    } catch (error) {
      toast.error("Something went wrong updating the product");
      console.log(error);
    }
  };
  return (
    <Card
      key={product.id}
      onClick={() => onClick(product)}
      className=" hover:shadow-md cursor-pointer"
    >
      <CardHeader>
        <CardTitle className="flex items-center">
          <div>
            <Image
              src={
                "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0&width=100"
              }
              alt={"product.name"}
              width={86}
              height={86}
              className=""
            />
          </div>
          <div className="w-full flex justify-between items-center px-4">
            <div>
              <div>{product.name}</div>
              <div className="text-gray-400 text-sm font-normal mt-1">
                Some choices
              </div>
            </div>
            <Badge variant="secondary">$ {product.price}</Badge>
          </div>
          <div>
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="onShelfStatus"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          ChangeStatus();
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={
                              field.value === "1"
                                ? "text-green-700"
                                : field.value === "2"
                                ? "text-red-700"
                                : "text-gray-400"
                            }
                          >
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shelfStatus?.map((status) => (
                            <SelectItem
                              key={status.id}
                              value={status.id.toString()}
                            >
                              {status.status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
