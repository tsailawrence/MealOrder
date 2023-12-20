"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocation } from "@/app/customer/LocationContext";
import CustomerCartHeader from "./CustomerCartHeader";
import { Menu, MapPin } from "lucide-react";
// Data for city-to-area mapping specific to Taiwan
const cityOptions: string[] = [
  "臺北市",
  "新北市",
  "基隆市",
  "新竹市",
  "桃園市",
  "新竹縣",
  "宜蘭縣",
  "臺中市",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "高雄市",
  "臺南市",
  "嘉義市",
  "嘉義縣",
  "屏東縣",
  "澎湖縣",
  "花蓮縣",
  "臺東縣"
];

const Header = () => {
  const routes = [
    {
      href: '/customer/restaurant',
      label: 'Restauarant',
    },
    {
      href: '/customer/order',
      label: 'Order',
    },
    {
      href: '/customer/monthlyPayment',
      label: 'Monthly Payment',
    },
  ];

  const { location,setLocation } = useLocation();
  const handleLocationChange = async (value:string) => {
    setLocation(value);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b px-10">
      <div className="flex justify-between items-center w-full h-20">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" color="#E60012" id="menu-button"></Menu>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4" id="nav-bar">
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
            <Image
              id="logo"
              src="/logo.png"
              alt="logo"
              width={90}
              height={30}
            />
          </Link>
          {location ?
            <Select onValueChange={(value) => handleLocationChange(value)}>
              <SelectTrigger className="w-[180px]">
                <MapPin /><SelectValue placeholder={location} />
              </SelectTrigger>
              <SelectContent>
                {cityOptions.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select> : 'Loading...'}
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
