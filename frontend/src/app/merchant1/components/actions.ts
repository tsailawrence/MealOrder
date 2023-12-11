import { instance } from "@/lib/utils";

export const getStore = async (userId: String) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // const response = await instance.get(`/api/store/${userId}`);
    // return response.data;
    return {
      id: 16,
      name: "Sally's Store",
      description: "123",
      categoryId: "1",
    };
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
};

export const createStore = async (userId: String, data: any) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    // const response = await instance.post(`/api/store/${userId}`, data);
    // return response.data;
    return {
      id: 16,
      name: "Sally's Store",
      description: "123",
      categoryId: "1",
    };
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // const response = await instance.get(`/api/store/category`);
    // return response.data;
    return [
      { id: "1", name: "手搖" },
      { id: "2", name: "日式" },
      { id: "3", name: "西式" },
      { id: "4", name: "中式" },
    ];
  } catch (error) {
    throw error;
  }
};
