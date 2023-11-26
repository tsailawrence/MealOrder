import Header from "@/components/CustomerHeader";
import { shoppingCartData } from "../dbTemplate/cardData";
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header items={shoppingCartData.items} restaurantName={shoppingCartData.restaurantName}/>
      <main className="flex flex-col items-center p-4 grow">
        {children}
      </main>
    </div>
  );
}
