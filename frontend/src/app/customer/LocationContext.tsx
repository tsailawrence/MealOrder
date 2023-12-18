// LocationContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { LocationContextType } from '@/lib/types/db';
import { getPlace } from "@/components/actions";
interface LocationProviderProps {
    children: ReactNode;
}

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
                setCookie('nowCity', 'north', 7);
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
    return context;
};
