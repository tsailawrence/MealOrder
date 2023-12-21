import { instance } from "@/lib/utils";
export const getMonthlyCustomerData = async (
  accessToken: string,
  storeId: string,
  month: string
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.get(
      `/my/store/${storeId}/order/customerMonthlyBilling/${month}`,
      {
        params: {
          accessToken,
        },
      }
    );
    console.log("getMonthlyCustomerData response", response);
    return response.data;
  } catch (err) {
    console.log("getAllOrders error", err);
  }
};
