import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

export default async function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <ToastProvider />
        <ModalProvider />
        {children}
      </div>
    </div>
  );
}
