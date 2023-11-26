
import React from 'react';
import { Label } from '@/components/ui/label';
import { SpecialInstructionsProps } from '@/lib/types/db';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const SpecialInstruction = ({ specialInstructions }: SpecialInstructionsProps) => {
    return (
        <>
            {specialInstructions.map((SpecialInstruction) => (
                <>
                    <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">Choose {SpecialInstruction.name}</span>
                        {SpecialInstruction.required ?
                            <div className="bg-red-600 bg-opacity-20 px-3 py-2 rounded-3xl">
                                <div className="text-red-600 text-xs font-bold tracking-wide uppercase opacity-[0.84] text-center">
                                    Required
                                </div>
                            </div>
                            : <></>
                        }
                    </div>
                    <RadioGroup defaultValue="option-one" className='gap-5'>
                        {SpecialInstruction.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option}>{option}</Label>
                            </div>))
                        }
                    </RadioGroup></>))
            }
        </>
    );
};

export default SpecialInstruction;
