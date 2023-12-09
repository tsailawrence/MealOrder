"use client";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useLocation } from "@/app/customer/LocationContext";
import CustomerCartHeader from "./CustomerCartHeader";
import { Menu, MapPin } from "lucide-react";
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
  const { location } = useLocation();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b px-10">
      <div className="flex justify-between items-center w-full h-20">
        <div className="flex items-center gap-4">
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
          <div className="flex text-xm text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-90px)] rounded-full border border-black p-2">
            <MapPin />{location ? location : 'Loading...'}
          </div>
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
