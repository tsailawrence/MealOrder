
import React, { useState, useEffect } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface HourMinuteProps {
    onTimeChange: (hour: string, minute: string, ampm: string) => void;
}

export const HourMinute: React.FC<HourMinuteProps> = ({ onTimeChange }) => {
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [ampm, setAmpm] = useState<string>('AM');

    useEffect(() => {
        if (hour && minute && ampm) {
            onTimeChange(hour, minute, ampm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hour, minute, ampm]);
    // Helper to generate options
    const generateOptions = (start:number, end:number) => {
        let options = [];
        for (let i = start; i <= end; i++) {
            options.push(
                <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                    {i.toString().padStart(2, '0')}
                </SelectItem>
            );
        }
        return options;
    }

    return (
        <div className="flex space-x-2">
            {/* Hours */}
            <Select onValueChange={setHour}>
                <SelectTrigger className="w-[60px] text-xs">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {generateOptions(1, 12)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Minutes */}
            <Select onValueChange={setMinute}>
                <SelectTrigger className="w-[60px] text-xs">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {generateOptions(0, 59)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* AM/PM */}
            <Select onValueChange={setAmpm}>
                <SelectTrigger className="w-[60px] text-xs">
                    <SelectValue placeholder={ampm} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
