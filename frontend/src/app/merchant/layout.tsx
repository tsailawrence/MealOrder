"use client";
import Header from "@/components/MerchantHeader";
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen"> 
        <Header/>
        <main className="flex flex-col items-center p-4 pt-20 mx-auto w-[95%]">
          {children}
        </main>
    </div>
  );
}
