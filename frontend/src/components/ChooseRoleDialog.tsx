"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ChooseRoleDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [userRole, setUserRole] = useState("employee");

  const handleSave = () => {
    // when navigating to the same page with different query params, we need to
    // preserve the pathname, so we need to manually construct the url
    // we can use the URLSearchParams api to construct the query string
    // We have to pass in the current query params so that we can preserve the
    // other query params. We can't set new query params directly because the
    // searchParams object returned by useSearchParams is read-only.
    const params = new URLSearchParams(searchParams);
    // validateUsername and validateHandle would return false if the input is
    // invalid, so we can safely use the values here and assert that they are
    // not null or undefined.
    params.set("username", username!);
    params.set("handle", handle!);
    router.push(`${pathname}?${params.toString()}`);
    setDialogOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Role</DialogTitle>
          <DialogDescription>
            Once you choose your role, you cannot change it later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            value={userRole}
            onValueChange={(newValue) => {
              setUserRole(newValue);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employee" id="empolyee" />
              <Label htmlFor="employee">Employee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seller" id="seller" />
              <Label htmlFor="seller">Seller</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
