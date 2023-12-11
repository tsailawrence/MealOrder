/* eslint-disable react/no-unescaped-entities */
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import { Menu, Pencil, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

import {
  getMenuCategories,
  getMenu,
} from "@/app/merchant1/[storeId]/menu/components/actions";
import { AddButton } from "@/app/merchant1/[storeId]/menu/components/AddButton";
import { CategoryModal } from "@/app/merchant1/[storeId]/menu/components/CategoryModal";
import { MenuTab } from "@/app/merchant1/[storeId]/menu/components/MenuTab";
import { MenuHourModal } from "./components/MenuHourModal";

const MenuPage = async ({ params }: { params: { storeId: string } }) => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;
  useEffect(() => {
    getMenu(accessToken, params.storeId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
      });
  }, [accessToken]); // Dependency array
  // const menuCategories = await getMenuCategories(params.storeId);

  return (
    <div className="px-10 py-5">
      menu
      {/* <CategoryModal />

      <div className="flex items-center gap-5  mb-6 px-1">
        <Heading title={`Menu`} description="Manage your menu here." />
        <MenuHourModal />
        <AddButton />
      </div>

      <Tabs defaultValue={menuCategories[0].id}>
        <TabsList className="w-full border-b-2 py-0">
          {menuCategories.map((category) => (
            <MenuTab
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
            />
          ))}
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1"></div>
              <div className="space-y-1"></div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1"></div>
              <div className="space-y-1"></div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default MenuPage;
