import { instance } from '@/lib/utils';
export const getRestaurantData = async (accessToken: string, id: string) => {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.get(
            `/store/restaurant/${id}/`,
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
export const addMyFavoriteRestaurant = async (accessToken: string, id: number) => {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        console.log('addMyFavoriteRestaurant', id);
        console.log('addMyFavoriteRe', accessToken);
        const { data: response } = await instance.post(
            `/my/favoriteStore/add/${id}`,
        )
        return response.data;
    } catch (err) {
        console.log('addMyFavoriteRestaurant error', err);
    }
}