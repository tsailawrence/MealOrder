
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { SpecialInstruction } from '@/lib/types/db';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Value } from '@radix-ui/react-select';
type SpecialInstructionProps = {
    specialInstructions: SpecialInstruction[];
    onOptionChange: (allRequiredSelected: boolean) => void;
};
    
const SpecialInstruction = ({ specialInstructions, onOptionChange }: SpecialInstructionProps) => {
    const [selections, setSelections] = useState<{ [key: string]: string }>({});
    // Handle the change in RadioGroup selection
    const handleOptionChange = (instructionName:string, selectedValue:string) => {
        setSelections(prevSelections => ({
            ...prevSelections,
            [instructionName]: selectedValue
        }));
    };

    // Effect to update the external button state
    useEffect(() => {
        const allRequiredSelected = specialInstructions.every(instruction => 
            !instruction.required || selections[instruction.name] != null
        );
        onOptionChange(allRequiredSelected);
    }, [selections, specialInstructions, onOptionChange]);
    return (
        <>
            {specialInstructions.map((SpecialInstruction, index) => (
                <div key={index}>
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">Choose {SpecialInstruction.name}</span>
                        {SpecialInstruction.required ?
                            <div className="bg-red-600 bg-opacity-20 px-3 py-2 rounded-3xl">
                                <div className="text-red-600 text-xs font-bold tracking-wide uppercase opacity-[0.84] text-center">
                                    Required
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <RadioGroup className='gap-5' onValueChange={(value) => handleOptionChange(SpecialInstruction.name, value)}>
                        {SpecialInstruction.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`${SpecialInstruction.name}-${option}`} />
                                <Label htmlFor={`${SpecialInstruction.name}-${option}`}>{option}</Label>
                            </div>
                        ))}
                        {SpecialInstruction.required ? 
                            null
                            :
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id={`${SpecialInstruction.name}-none`} />
                                <Label htmlFor={`${SpecialInstruction.name}-none`}>None</Label>
                            </div>
                        }
                    </RadioGroup>
                </div>
            ))}
        </>
    );
};

export default SpecialInstruction;
