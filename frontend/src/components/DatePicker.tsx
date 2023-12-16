"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
interface DatePickerProps {
    onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
    const [date, setDate] = React.useState<Date | undefined>();
    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
            onDateChange(newDate);
        } else {
            // Handle the undefined case if necessary
            // For example, you might want to clear the date
            setDate(undefined);
        }
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[150px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>

    )
}
