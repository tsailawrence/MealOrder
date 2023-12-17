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

export async function addMyFavoriteRestaurant(accessToken: string, id: number) {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.post(
            `/my/favoriteStore/add/${id}`,
            {
                accessToken,
            }
        )
        return response.data;
    } catch (err) {
        console.log('addMyOrder error', err);
    }
}

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
