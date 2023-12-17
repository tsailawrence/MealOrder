import { instance } from '@/lib/utils';

export const getOrders = async (accessToken:string) => {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.');
        }
        const { data: response } = await instance.get(`/my/order/get`, {
            params: {
                accessToken,
            },
        });
        return response.data;
    }
    catch (err) {
        console.log('getOrders error', err);
    }
}

export const getNamebyId = async (accessToken:string, id:string) => {
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.');
        }
        const { data: response } = await instance.get(`/my/user/${id}`, {
            params: {
                accessToken,
            },
        });
        return response.data;
    }
    catch (err) {
        console.log('getNamebyId error', err);
    }
}