import { instance } from '@/lib/utils';
const Menu = [
    {
        "categoryName": "Pizza",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "BarBarbecue",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Donuts",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burgerster",
                starNumber: 200,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecdcue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Sweetie",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: false,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 530,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Master",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Pizza1",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: false,
            },
        ]
    },
    {
        "categoryName": "BarBarbecue1",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Donuts1",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Sweetie1",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
    {
        "categoryName": "Master1",
        "restaurant": [
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/86ce9750-e81c-48aa-87ee-33718641708b?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "Burger Master",
                starNumber: 400,
                likes: true,
            },
            {
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fd4e8c0-2a0b-4931-9aaa-7320720c7c5d?apiKey=5d949b60a548481d8fbc5fec7da626b0",
                name: "BarBarbecue",
                starNumber: 50,
                likes: true,
            },
        ]
    },
]


// export const getCategory = (categoryData: string) => {
//     return Menu.filter((item) => item.categoryName === categoryData)[0]
// }

export const getCategorys = async (accessToken: string) => {
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

export const getStores = async (accessToken: string, categoryId: number) => {
    try {
        if (!accessToken) {
            throw new Error("AccessToken Not Exist.");
        }
        const { data: response } = await instance.get(
            `/store/restaurantByCategory/${categoryId}`,
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
