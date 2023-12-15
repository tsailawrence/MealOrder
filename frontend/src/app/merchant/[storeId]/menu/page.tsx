import { Heading } from "@/components/ui/heading";

import { MenuHourModal } from "@/app/merchant/[storeId]/menu/components/MenuHourModal";
import { Menu } from "@/app/merchant/[storeId]/menu/components/Menu";

const MenuPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <div className="flex items-center gap-5  py-5 px-10">
        <Heading title={`Menu`} description="Manage your menu here." />
        <MenuHourModal />
      </div>
      <Menu />
    </>
  );
};

export default MenuPage;
