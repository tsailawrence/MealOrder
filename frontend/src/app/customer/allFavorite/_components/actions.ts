import { instance } from '@/lib/utils';
export const getAllFavoriteStore = async (accessToken: string) => {
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
        console.log('getFavoriteData error', err);
    }
}