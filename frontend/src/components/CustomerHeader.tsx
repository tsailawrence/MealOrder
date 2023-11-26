import Image from "next/image";
import Link from "next/link";

import { Cross2Icon } from "@radix-ui/react-icons";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { CustomerCartHeader } from "./CustomerCartHeader";
import { Menu } from "lucide-react";

const Header = () => {
  const routes = [
    {
      href: "/customer/restaurant",
      label: "Restauarant"
    },
    {
      href: "/customer/order",
      label: "Order"
    },
    {
      href: "/customer/monthlyPayment",
      label: "Monthly Payment"
    },
    {
      href: "/customer/settings",
      label: "Settings"
    }
  ];

  return (
    <header className="sm:flex sm:justify-between px-10 border-b">
      <div className="relative  flex h-20 items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" color="#E60012"></Menu>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    className="block  py-1 text-lg"
                  >
                    <SheetClose>{route.label}</SheetClose>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="">
            <Image src="/logo.png" alt="logo" width={90} height={30} />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <CustomerCartHeader />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
