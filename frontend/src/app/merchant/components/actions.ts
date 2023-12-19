import { instance } from "@/lib/utils";

export const getStore = async (accessToken: string) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.get(`/my/store`, {
      params: {
        accessToken,
      },
    });
    return response.data;
  } catch (err) {
    return;
  }
};

export const getCategories = async (accessToken: string) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.get(`/store/restaurantCategory`, {
      params: {
        accessToken,
      },
    });
    return response.data;
  } catch (err) {
    return;
  }
};

export const createStore = async (accessToken: string, data: any) => {
  data.uri = data.storeImage;
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(`/my/store/add`, data, {
      params: {
        accessToken,
      },
    });
    return response.data;
  } catch (err) {
    return;
  }
};

export const updateStore = async (
  accessToken: string,
  storeId: string,
  data: any
) => {
  data.uri = data.storeImage;
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/update/${storeId}`,
      data,
      {
        params: {
          accessToken,
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (err) {
    return;
  }
};
