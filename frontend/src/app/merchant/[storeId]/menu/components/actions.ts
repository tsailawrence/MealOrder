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
    return;
  }
};

export const createMenuType = async (
  accessToken: string,
  storeId: string,
  data: any
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/${storeId}/menu/type`,
      { value: data.type },
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

export const updateMenuType = async (
  accessToken: string,
  storeId: string,
  typeId: string,
  data: any
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/${storeId}/update/menu/type/${typeId}`,
      { value: data.type },
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

export const deleteMenuType = async (
  accessToken: string,
  storeId: string,
  typeId: string
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }

    console.log(accessToken);
    const { data: response } = await instance.post(
      `/my/store/${storeId}/delete/menu/type/${typeId}`,
      {},
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

export const createProduct = async (
  accessToken: string,
  storeId: string,
  data: any
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/${storeId}/menu`,
      data,
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

export const updateProduct = async (
  accessToken: string,
  storeId: string,
  productId: string,
  data: any
) => {
  try {
    data.menuTypeId = parseInt(data.menuTypeId);
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/update/${storeId}/menu/${productId}`,
      data,
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

export const deleteProduct = async (
  accessToken: string,
  storeId: string,
  productId: string
) => {
  try {
    if (!accessToken) {
      throw new Error("AccessToken Not Exist.");
    }
    const { data: response } = await instance.post(
      `/my/store/delete/${storeId}/menu/${productId}`,
      {},
      {
        params: {
          accessToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return;
  }
};

// export const getMenuHour = async (accessToken: string, storeId: string) => {
//   try {
//     if (!accessToken) {
//       throw new Error("AccessToken Not Exist.");
//     }
//     const { data: response } = await instance.get(
//       `/my/store/${storeId}/menu/hour`,
//       {
//         params: {
//           accessToken,
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     return;
//   }
// };

// export const updateMenuHour = async (
//   accessToken: string,
//   storeId: string,
//   data: any
// ) => {
//   try {
//     if (!accessToken) {
//       throw new Error("AccessToken Not Exist.");
//     }
//     const { data: response } = await instance.put(
//       `/my/store/${storeId}/menu/hour`,
//       data,
//       {
//         params: {
//           accessToken,
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     return;
//   }
// };
