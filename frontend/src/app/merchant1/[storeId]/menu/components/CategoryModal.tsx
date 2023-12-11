"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { createMenuCategory } from "@/app/merchant1/[storeId]/menu/components/actions";
import { useParams } from "next/navigation";

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
import { useCategoryModal } from "@/hooks/use-category-modal";
import { updateMenuCategory } from "@/app/merchant1/[storeId]/menu/components/actions";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const CategoryModal = () => {
  const params = useParams();
  const categoryModal = useCategoryModal();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!categoryModal.isEdit) {
      try {
        setLoading(true);
        await createMenuCategory(params.storeId, values);
        window.location.reload();
        toast.success("Category created");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await updateMenuCategory(
          params.storeId,
          categoryModal.categoryId,
          values
        );
        window.location.reload();
        toast.success("Category updated");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Set default values when the modal opens
    if (categoryModal.isOpen) {
      form.reset({
        name: categoryModal.categoryName,
      });
    } else {
      form.reset();
      categoryModal.categoryId = "";
      categoryModal.categoryName = "";
    }
  }, [categoryModal, form]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Store Details"
      description="Edit your store details here."
      isOpen={categoryModal.isOpen}
      onClose={categoryModal.onClose}
    >
      <div className="py-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name"
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
                onClick={categoryModal.onClose}
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
    </Modal>
  );
};
