import prismadb from "@/lib/prismadb";

import { getMenuCategories } from "@/app/merchant1/[storeId]/menu/components/actions";
import { ProductForm } from "@/app/merchant1/[storeId]/menu/[productId]/components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    // include: {
    //   images: true,
    // },
  });

  const menuCategories = await getMenuCategories(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm menuCategories={menuCategories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
