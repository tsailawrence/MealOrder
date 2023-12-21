import { instance } from "@/lib/utils";
export const getAllOrders = async (accessToken: string) => {
    try {
      if (!accessToken) {
        throw new Error("AccessToken Not Exist.");
      }
      const { data: response } = await instance.get(`/my/store/orders`, {
        params: {
          accessToken,
        },
      });
      return response.data;
    } catch (err) {
      console.log("getAllOrders error", err);
    }
};

export const updateOrderStatus = async (
  accessToken: string,
  orderId: number,
  status: string
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/updateOrder/${orderId}`,
      {
        status,
      },
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("updateOrderStatus error", err);
  }
};
