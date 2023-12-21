import EditStore from "@/app/admin/components/EditStore";
import Link from "next/link";

const MerchantHeader = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6 gap-5">
        <EditStore />
        <Link href="/admin" className="ml-auto">
        <span >Back</span>
      </Link>
      </div>
    </div>
  );
};

export default MerchantHeader;
