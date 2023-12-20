"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import ScheduleSelector from "react-schedule-selector";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

export const MenuHourModal = () => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuHour, setMenuHour] = useState<Date[]>([]);
  const params = useParams();

  //當 modal 打開時，會去取得 menu hour 的資料，並且將資料放入 menuHour state 中
  //當 modal 關閉時，會將 menuHour state 清空
  useEffect(() => {
    if (open) {
      // setLoading(true);
      // getMenuHour(accessToken, params.storeId)
      //   .then((data) => {
      //     setMenuHour(data);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     toast.error("Something went wrong.");
      //     setLoading(false);
      //     setOpen(false);
      //   });
    }
  }, [open]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onConfirm = async () => {
    try {
      setLoading(true);
      console.log("menuHour", menuHour);
      // await updateMenuHour(accessToken, params.storeId, menuHour);
      toast.success("Menu hour updated");
    } catch (error) {
      toast.error("Something went wrong when updating menu hour");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <CalendarClock size={15} />
        Edit Menu Hour
      </Button>
      {isMounted && (
        <Modal
          title="Edit Menu Hour"
          description="Select the time you want to open your store"
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div className="overflow-scroll h-96">
            <ScheduleSelector
              selection={menuHour}
              startDate={new Date("2023-12-04")}
              dateFormat="ddd"
              timeFormat="HH:mm"
              minTime={0}
              maxTime={24}
              hourlyChunks={2}
              columnGap={"2px"}
              rowGap="2px"
              onChange={setMenuHour}
            />
          </div>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              type="button"
              disabled={loading}
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={onConfirm}
            >
              Continue
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
