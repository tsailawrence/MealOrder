"use client";

import axios from 'axios';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { promises } from "dns";

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig() || {};

export default function ChooseRoleDialog(props: any) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState("employee");

  const { baseUrl } = process?.env ?? {};
  
  useEffect(() => {
    setDialogOpen(true);
  }, []);

  const handleSave = async () => {
    let path;
    let type;
    if (userRole === "employee") {
      // 跳轉到員工的註冊頁面
      path = '/customer/restaurant';
      type = 'employee';
    } else {
      // 跳轉到商家的註冊頁面
      path = '/merchant';
      type = 'merchant';
    }

    router.push(path);

    // await axios.post(`${baseUrl}/register`, Object.assign(
    //   props?.props,
    //   {
    //     type
    //   }
    // ));
    
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleSave}>
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
              <Label htmlFor="seller">Merchant</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
