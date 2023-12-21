
import { Menu } from "@/app/admin/[storeId]/menu/components/Menu";

const MenuPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <div className="flex items-center gap-5  py-5 px-10">
        <Menu />
      </div>
    </>
  );
};

export default MenuPage;
