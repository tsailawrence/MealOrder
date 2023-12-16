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
        console.log('data', data);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const cityNode = xmlDoc.getElementsByTagName('ctyName')[0];
        console.log('cityNode', cityNode);
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
