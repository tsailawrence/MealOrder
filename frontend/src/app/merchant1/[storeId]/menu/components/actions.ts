import { instance } from "@/lib/utils";

export const getMenu = async (accessToken: string, storeId: string) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.get(
      `/my/store/${storeId}/products`,
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("getMenu error", err);
  }
};

// 取得所有此商店菜單的種類
export const getMenuCategories = async (storeId: String) => {
  try {
    if (!storeId) {
      throw new Error("Store ID is required");
    }
    const response = await instance.get(`/api/${storeId}/menu/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 新增一個菜單種類
export const createMenuCategory = async (storeId: String, data: any) => {
  try {
    if (!storeId) {
      throw new Error("Store ID is required");
    }
    const response = await instance.post(`/api/${storeId}/menu/category`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 修改一個菜單種類
export const updateMenuCategory = async (
  storeId: String,
  categoryId: String,
  data: any
) => {
  try {
    if (!storeId) {
      throw new Error("Store ID is required");
    }
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    const response = await instance.put(
      `/api/${storeId}/menu/category/${categoryId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 刪除一個菜單種類
export const deleteMenuCategory = async (
  storeId: String,
  categoryId: String
) => {
  try {
    if (!storeId) {
      throw new Error("Store ID is required");
    }
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    const response = await instance.delete(
      `/api/${storeId}/menu/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
