import { SignedIn, UserButton } from "@clerk/nextjs";
import { Navbar } from "@/app/merchant/components/Navbar";
import EditStore from "@/app/merchant/components/EditStore";

const MerchantHeader = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6 gap-5">
        <EditStore />
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
