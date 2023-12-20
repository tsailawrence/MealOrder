// LocationContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { LocationContextType } from '@/lib/types/db';
import { getPlace } from "@/components/actions";
interface LocationProviderProps {
    children: ReactNode;
}

// Define the type for the city-to-area mapping
type CityAreaMapping = {
    [city: string]: string;
};

// Data for city-to-area mapping specific to Taiwan
const cityAreaData: CityAreaMapping = {
    // North Area
    "臺北市": "North",
    "新北市": "North",
    "基隆市": "North",
    "新竹市": "North",
    "桃園市": "North",
    "新竹縣": "North",
    "宜蘭縣": "North",

    // Central Area
    "臺中市": "Central",
    "苗栗縣": "Central",
    "彰化縣": "Central",
    "南投縣": "Central",
    "雲林縣": "Central",

    // South Area
    "高雄市": "South",
    "臺南市": "South",
    "嘉義市": "South",
    "嘉義縣": "South",
    "屏東縣": "South",
    "澎湖縣": "South",

    // East Area
    "花蓮縣": "East",
    "臺東縣": "East"
};

// Function to classify city names to areas
const classifyCityToArea = (city: string): string => {
    const area = cityAreaData[city];
    if (!area) {
        console.warn(`Area classification not found for city: ${city}`);
        return "Unknown"; // Fallback if the city is not in the mapping
    }
    return area;
};


const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<string>('');

    // 设置Cookie的函数
    function setCookie(name: string, value: string, days: number): void {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + expirationDate.toUTCString();

        document.cookie = name + "=" + value + "; " + expires + "; path=/";
    }

    useEffect(() => {
        const handleSuccess = async (position: GeolocationPosition) => {
            const { nowCity } = await getPlace(position.coords.latitude, position.coords.longitude);
            if (nowCity) {
                setLocation(nowCity);
                const area = classifyCityToArea(nowCity);
                setCookie('nowCity', area, 7);
            }
        };

        const handleError = (error: GeolocationPositionError) => {
            console.error('Geolocation Error:', error);
            // Handle error or set a default state
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Handle the case where the browser doesn't support Geolocation
        }
    }, []);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

// Custom hook for using the location context
export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    // Expose both location and setLocation
    const { location, setLocation } = context;

    return { location, setLocation };
};
