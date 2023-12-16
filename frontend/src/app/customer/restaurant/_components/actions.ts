import { instance } from '@/lib/utils';
//template data
const cardData = [
    {
        id: 1,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Burger Master",
        starNumber: 400,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue",
        starNumber: 50,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts hut",
        starNumber: 24,
        likes: false,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie",
        starNumber: 22,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Burger Master",
        starNumber: 46,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue",
        starNumber: 50,
        likes: false,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts hut",
        starNumber: 24,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie",
        starNumber: 22,
        likes: false,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Burger Master",
        starNumber: 400,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue",
        starNumber: 50,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts hut",
        starNumber: 24,
        likes: false,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie",
        starNumber: 22,
        likes: true,
    },
    {
        id: 2,
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Burger Master",
        starNumber: 46,
        likes: true,
    },
];
//template data
const categoryData = [
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d690fc5-da56-4329-9fd1-97b67e5942d4?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Pizza",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Master",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d690fc5-da56-4329-9fd1-97b67e5942d4?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Pizza1",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue1",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts1",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie1",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Master1",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d690fc5-da56-4329-9fd1-97b67e5942d4?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Pizza",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "BarBarbecue",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ab70aa8-24e1-4686-8c85-0e6302728eda?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Donuts",
    },
    {
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca5e8dd1-206f-42d6-ba04-4c15f582cbf2?apiKey=5d949b60a548481d8fbc5fec7da626b0",
        name: "Sweetie",
    },
];

export const getCardData = async (accessToken: string) => {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.get(
            `/store/topRestaurant`,
            {
                params: {
                    accessToken
                }
            }
        )
        return response.data;
    } catch (err) {
        // TODO: login again
        console.log('getAllOrders error', err);
    }
}

export const lineBinding = async (accessToken: string, lineId: string) => {
    // line Binding
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.post(
            `/line/${lineId}`,
            {},
            {
                params: {
                    accessToken
                }
            }
        )
        return response.data;
    } catch (err) {
        // TODO: login again
        console.log('lineBinding error', err);
    }
}

export const getCategoryData = () => {
    //top 10 categories, restrict to 10
    const top10 = categoryData.slice(0, 10);
    return top10;
}

// export const getCardData = () => {
//     const top10 = cardData.slice(0, 10);
//     return top10;
// }
export const getFavoriteData = () => {
    const top10 = cardData.slice(0, 10);
    return top10;
}
export const getRestaurantCategoryData = async (accessToken: string) => {
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.get(
            `/store/restaurantCategory`,
            {
                params: {
                    accessToken
                }
            }
        )
        return response.data;
    } catch (err) {
        console.log('getRestaurantCategoryData error', err);
    }
}
