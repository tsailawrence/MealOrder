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
        // Replace this URL with the actual URL of your geocoding service
        console.log(process.env.GOOGLE_MAP_API_KEY);

        const response = await fetch(`https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}`);
        console.log('response', response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.text();
        console.log('data', data);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        console.log('xmlDoc', xmlDoc);
        const cityNode = xmlDoc.getElementsByTagName('ctyName')[0];
        const townNode = xmlDoc.getElementsByTagName('twnName')[0];
        return cityNode.textContent; // This will be '臺北市' in your case
    } catch (error) {
        console.error("Failed to fetch place name:", error);
        return null;
    }
}

export async function getPlace(latitude: number, longitude: number): Promise<{ nowCity: string | null }> {
    const placeName = await fetchPlaceName(latitude, longitude);
    return { nowCity: placeName };
}
