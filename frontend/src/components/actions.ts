//get tthe city name from the lat and lng
interface GeocodingApiResponse {
    results: {
        address_components: {
            long_name: string;
        }[];

    }[];
    status: string;
    // Include other fields if necessary
}

async function fetchPlaceName(latitude: number, longitude: number): Promise<string | null> {
    try {
        // Replace this URL with the actual URL of your geocoding service
        console.log(process.env.GOOGLE_MAP_API_KEY);
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data: GeocodingApiResponse = await response.json();
        if (data.status !== "OK") {
            throw new Error(`Error: ${data.status}`);
        }
        const placeName = data.results[0].address_components[4].long_name;
        return placeName;
    } catch (error) {
        console.error("Failed to fetch place name:", error);
        return null;
    }
}

export async function getPlace(latitude: number, longitude: number): Promise<{ nowCity: string | null }> {
    const placeName = await fetchPlaceName(latitude, longitude);
    return { nowCity: placeName };
}
