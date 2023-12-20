import { instance } from '@/lib/utils';

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
