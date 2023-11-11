import Header from "@/components/MerchantHeader";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container mx-auto px-4">{children}</div>
    </>
  );
}
