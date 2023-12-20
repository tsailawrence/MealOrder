import { SignedIn, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/app/admin/components/Navbar";
import EditStore from "@/app/admin/components/EditStore";

const MerchantHeader = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6 gap-5">
        <EditStore />
      </div>
    </div>
  );
};

export default MerchantHeader;
