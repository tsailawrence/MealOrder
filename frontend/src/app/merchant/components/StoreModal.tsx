'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  getCategories,
  createStore,
  updateStore,
} from '@/app/merchant/components/actions';

import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  storeImage: z.string(),
  name: z.string().min(1),
  area: z.string().min(1),
  category: z.string(),
});

type Category = {
  id: number;
  categoryName: string;
};

type Store = {
  id: number;
  storeImage: string;
  name: string;
  area: string;
  category: number;
};
interface StoreModalProps {
  storeInfo: Store | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const StoreModal = ({ open, setOpen, storeInfo }: StoreModalProps) => {
  const [cookies, setCookie] = useCookies([
    'refreshToken',
    'accessToken',
    '__session',
  ]);
  const { __session: accessToken = '' } = cookies;
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (open) {
      getCategories(accessToken).then(data => {
        setCategories(data);
      });
      // Set default values for editing
      if (storeInfo) {
        form.reset({
          storeImage: storeInfo.storeImage,
          name: storeInfo.name,
          area: storeInfo.area,
          category: storeInfo.category.toString(),
        });
      }
    } else {
      form.reset({
        storeImage: '',
        name: '',
        area: '',
        category: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, storeInfo]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (storeInfo) {
        const store = await updateStore(
          accessToken,
          storeInfo.id.toString(),
          values
        );
        if (store) {
          toast.success('Store updated');
        }
      } else {
        const store = await createStore(accessToken, values);
        if (store) {
          toast.success('Store created');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong when updating store');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal
      title="Store Details"
      description="Edit your store details here."
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <div className="py-3">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="storeImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const base64String = reader.result?.toString();
                              if (base64String)
                                form.setValue('storeImage', base64String);
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
                        placeholder="Store Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map(category => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="pt-5 space-x-2 flex items-center justify-end w-full">
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
    </Modal>
  );
};
