"use client"
import React, { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function DatePickerDemo() {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
    )
}
