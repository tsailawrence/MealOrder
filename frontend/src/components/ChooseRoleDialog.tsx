'use client';

import { instance } from '@/lib/utils';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { promises } from 'dns';
import { useCookies } from 'react-cookie';
import getConfig from 'next/config';
import { access } from 'fs';

const { publicRuntimeConfig } = getConfig() || {};

export default function ChooseRoleDialog(props: any) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [cookies, setCookie] = useCookies([
    'refreshToken',
    'accessToken',
    '__session',
  ]);

  useEffect(() => {
    // Check is login
    userInfoCheck();
  });

  const userInfoCheck = async () => {
    const { __session: accessToken = '' } = cookies;

    try {
      if (!accessToken) {
        throw new Error('AccessToken Not Exist.');
      }

      if (!Object.values(userInfo).length) {
        const { data: response } = await instance.get(`/my/info`, {
          params: {
            accessToken,
          },
        });

        setUserRole(response?.data?.type);
        setUserInfo(response?.data);
      }

      if (userRole) {
        if (userRole === 'admin') {
            router.push('/admin');
        }
        router.push(
          userRole === 'employee' ? '/customer/restaurant' : '/merchant'
        );
      }
      return true;
    } catch (err) {
      // TODO: login again
      console.log('導向重新登入', err);
    }

    // 確認完才進行選擇框呼叫
    setDialogOpen(true);
  };

  const handleSave = async () => {
    let path;
    let type;
    if (userRole === 'employee') {
      // 跳轉到員工的註冊頁面
      path = '/customer/restaurant';
      type = 'employee';
    } else {
      // 跳轉到商家的註冊頁面
      path = '/merchant';
      type = 'merchant';
    }
    // router.push(path);

    // Register
    try {
      let { __session: accessToken = '' } = cookies;
      const { data: response } = await instance.post(
        `/clerk/register`,
        Object.assign(props?.props, {
          type,
        }),
        {
          params: {
            accessToken,
          },
        }
      );
    } catch (err) {
      // TODO: register error
    }

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
            onValueChange={newValue => {
              setUserRole(newValue);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employee" id="employee" />
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
