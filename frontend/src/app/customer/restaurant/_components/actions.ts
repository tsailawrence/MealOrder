import { instance } from '@/lib/utils';

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

<<<<<<< HEAD
export const lineBinding = async (accessToken: string, lineId: string) => {
    // line Binding
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.post(
            `/line/${lineId}`,
            {},
=======
export const getFavoriteData = async (accessToken: string) => {
    try {
        const { data: response } = await instance.get(
            `/my/favoriteRestaurant`,
>>>>>>> b8428881d5528995291abb05fec306a79c733100
            {
                params: {
                    accessToken
                }
            }
        )
        return response.data;
    } catch (err) {
<<<<<<< HEAD
        // TODO: login again
        console.log('lineBinding error', err);
    }
}

export const getCategoryData = () => {
    //top 10 categories, restrict to 10
    const top10 = categoryData.slice(0, 10);
    return top10;
=======
        console.log('getFavoriteData error', err);
    }
>>>>>>> b8428881d5528995291abb05fec306a79c733100
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
