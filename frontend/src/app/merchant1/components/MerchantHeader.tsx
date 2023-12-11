import { SignedIn, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/app/merchant1/components/Navbar";
import EditStoreIcon from "@/app/merchant1/components/EditStore";

interface MerchantHeaderProps {
  storeName: string;
}

const MerchantHeader: React.FC<MerchantHeaderProps> = ({ storeName }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6 gap-5">
        <div className="text-2xl font-bold">
          {storeName}
          <EditStoreIcon />
        </div>
        <Navbar />
        <div className="ml-auto flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default MerchantHeader;
