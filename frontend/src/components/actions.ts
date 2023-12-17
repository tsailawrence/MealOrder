import { CartCardProps } from "@/lib/types/db";
import { instance } from "@/lib/utils";
//get tthe city name from the lat and lng
// interface GeocodingApiResponse {
//     results: {
//         address_components: {
//             long_name: string;
//         }[];

//     }[];
//     status: string;
//     // Include other fields if necessary
// }

async function fetchPlaceName(latitude: number, longitude: number): Promise<string | null> {
    try {
        const response = await fetch(`https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const townNode = xmlDoc.getElementsByTagName('townName')[0];
        return townNode.textContent; // This will be '臺北市' in your case
    } catch (error) {
        console.error("Failed to fetch place name:", error);
        return null;
    }
}

export async function getPlace(latitude: number, longitude: number): Promise<{ nowCity: string | null }> {
    const placeName = await fetchPlaceName(latitude, longitude);
    return { nowCity: placeName };
}

export async function addMyOrder(accessToken: string, cart: CartCardProps) {
    // Register
    try {
        if (!accessToken) {
            throw new Error('AccessToken Not Exist.')
        }
        const { data: response } = await instance.post(
            `/my/order/add`,
            cart,
            {
                params: {
                    accessToken,
                },
            }
        )
        return response.data;
    } catch (err) {
        console.log('addMyOrder error', err);
    }
}