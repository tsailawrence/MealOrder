"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/merchant/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/merchant/${params.storeId}/orders`,
    },
    {
      href: `/merchant/${params.storeId}/menu`,
      label: "Menu",
      active: pathname === `/merchant/${params.storeId}/menu`,
    },
    {
      href: `/merchant/${params.storeId}/payments`,
      label: "Payments",
      active: pathname === `/merchant/${params.storeId}/payments`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
