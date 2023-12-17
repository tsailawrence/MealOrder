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

export const getFavoriteData = async (accessToken: string) => {
    try {
        const { data: response } = await instance.get(
            `/my/favoriteRestaurant`,
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
