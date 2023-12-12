"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "next/navigation";

import { getMenu } from "@/app/merchant/[storeId]/menu/components/actions";
import { MenuTab } from "@/app/merchant/[storeId]/menu/components/MenuTab";
import { MenuTypeModal } from "@/app/merchant/[storeId]/menu/components/MenuTypeModal";
import { ProductSheet } from "@/app/merchant/[storeId]/menu/components/ProductSheet";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCard } from "./ProductCard";

export const Menu = () => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;
  const params = useParams();
  const [menuType, setMenuType] = useState([]);
  const [menuTypeModalOpen, setMenuTypeModalOpen] = useState(false);
  const [editMenuType, setEditMenuType] = useState();
  const [products, setProducts] = useState([]);
  const [productSheetOpen, setProductSheetOpen] = useState(false);
  const [editProduct, setEditProduct] = useState();

  const fetchMenu = () => {
    getMenu(accessToken, params.storeId)
      .then((data) => {
        console.log(data);
        setMenuType(data.menuTypes);
        setProducts(data.menus);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, [accessToken]);

  const handleClickCard = (product) => {
    setEditProduct(product);
    setProductSheetOpen(true);
  };

  return (
    <>
      <MenuTypeModal
        open={menuTypeModalOpen}
        setOpen={setMenuTypeModalOpen}
        menuTypeInfo={editMenuType}
        onChange={fetchMenu}
      />
      <ProductSheet
        open={productSheetOpen}
        setOpen={setProductSheetOpen}
        productInfo={editProduct}
        onChange={fetchMenu}
        menuTypes={menuType}
      />
      <div className=" px-9">
        {menuType && menuType.length !== 0 && (
          <Tabs defaultValue={menuType[0].id.toString()}>
            <TabsList className="w-full border-b-2 py-0">
              {menuType.map((type) => (
                <MenuTab
                  key={type.id.toString()}
                  categoryId={type.id.toString()}
                  categoryName={type.type}
                  onEdit={() => {
                    setMenuTypeModalOpen(true);
                    setEditMenuType(type);
                  }}
                />
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditMenuType(undefined);
                  setMenuTypeModalOpen(true);
                }}
                aria-label="Add menu type"
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </TabsList>
            <Button
              variant="ghost"
              className="w-full my-2"
              onClick={() => {
                setEditProduct(undefined);
                setProductSheetOpen(true);
              }}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
            {menuType.map((type) => (
              <TabsContent
                key={type.id.toString()}
                value={type.id.toString()}
                className="grid grid-cols-2 gap-4 mt-0"
              >
                {products
                  .filter((product) => product.menuTypeId === type.id)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleClickCard}
                    />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        )}
        {menuType && menuType.length === 0 && (
          <Tabs>
            <TabsList className="w-full border-b-2 py-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditMenuType(undefined);
                  setMenuTypeModalOpen(true);
                }}
                aria-label="Add menu type"
              >
                {" "}
                Add
              </Button>
            </TabsList>
          </Tabs>
        )}
      </div>
    </>
  );
};
