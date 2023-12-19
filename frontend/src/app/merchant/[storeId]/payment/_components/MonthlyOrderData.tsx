"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

import { CustomerBilling } from "@/lib/types/db";
import { getMonthlyCustomerData } from "./actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//產生今年的年份以及今年之前的年份
const year = new Date().getFullYear();
const years = Array.from(new Array(3), (val, index) => year - index);

export const MonthlyOrderData = () => {
  const [cookies, setCookie] = useCookies([
    "refreshToken",
    "accessToken",
    "__session",
  ]);
  const { __session: accessToken = "" } = cookies;
  const params = useParams();
  const storeId = params.storeId?.toString();

  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<CustomerBilling[] | null>(
    null
  );
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const fetchMonthlyCustomerData = () => {
    setLoading(true);
    getMonthlyCustomerData(
      accessToken,
      storeId,
      `${selectedMonthData.year}${selectedMonthData.month}`
    )
      .then((data) => {
        console.log("Customer Data:", data);
        setCustomerData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customer data:", err);
      });
  };

  useEffect(() => {
    fetchMonthlyCustomerData();
  }, [accessToken]);

  useEffect(() => {
    console.log("selectedMonthData:", selectedMonthData);
    fetchMonthlyCustomerData();
  }, [selectedMonthData]);

  const storeTotalRevenue =
    customerData && customerData.reduce((acc, cur) => acc + cur.totalCosts, 0);
  const storeTotalOrders =
    customerData && customerData.reduce((acc, cur) => acc + cur.totalOrders, 0);
  const storeTotalCustomers = customerData && customerData.length;

  return (
    <div className="grid grid-cols-4 px-9 py-5 ">
      <div className="grid grid-rows-4 h-[70vh]">
        <div className=" text-1xl font-bold">
          {monthNames[selectedMonthData.month - 1]}, {selectedMonthData.year}{" "}
          <div className="flex mt-2 gap-2">
            <Select
              value={selectedMonthData.month.toString()}
              onValueChange={(e) => {
                setSelectedMonthData({
                  ...selectedMonthData,
                  month: parseInt(e),
                });
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="h-fit max-h-[150px]">
                <SelectGroup>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={selectedMonthData.year.toString()}
              onValueChange={(e) => {
                setSelectedMonthData({
                  ...selectedMonthData,
                  year: parseInt(e),
                });
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="h-fit max-h-[150px]">
                <SelectGroup>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-[#e60012] mb-2">
            Total Revenue
          </p>
          {loading ? (
            <Skeleton className="w-24 h-5" />
          ) : (
            <p className="text-2xl font-bold">NT${storeTotalRevenue}</p>
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-[#e60012] mb-2">Orders</p>
          {loading ? (
            <Skeleton className="w-24 h-5" />
          ) : (
            <p className="text-2xl font-bold">{storeTotalOrders}</p>
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-[#e60012] mb-2">Customers</p>
          {loading ? (
            <Skeleton className="w-24 h-5" />
          ) : (
            <p className="text-2xl font-bold">{storeTotalCustomers}</p>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex ">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="col-span-3 h-fit max-h-[70vh] overflow-y-scroll rounded-sm border-red-100 border">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-100">
                <TableHead className=" text-black font-semibold text-center">
                  Employee ID
                </TableHead>
                <TableHead className=" text-black font-semibold text-center">
                  Employee Name
                </TableHead>
                <TableHead className=" text-black font-semibold text-center">
                  Order Times
                </TableHead>
                <TableHead className=" text-black font-semibold text-center">
                  Total Costs
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData?.map((customer) => (
                <TableRow
                  key={customer.customerId}
                  className="text-center font-normal"
                >
                  <TableCell className="py-2 h-14">
                    {customer.customerId}
                  </TableCell>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>NT${customer.totalCosts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
