import Header from "@/components/CustomerHeader";

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
