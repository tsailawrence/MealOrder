'use client'
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Textarea } from "@/components/ui/textarea"
import SpecialInstruction from '@/components/SpecialInstruction';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Item = {
    name: string;
    price: number;
    quantity: number;
    note?: string;
    specialInstructions?: string[];
}
type Cart = {
    restaurantName: string;
    storeid: number;
    items: Item[]; //item name, price, quantity
}
type CardPriceProps = {
    storeId: number;
    restaurantName: string;
    uri: string;
    name: string;
    price: number;
    description: string;
    specialInstructions?: SpecialInstruction[];
}
export const CardPriceComponent: React.FC<CardPriceProps> = ({ storeId ,restaurantName, uri, name, price, description }) => {
    const [itemQuantity, setitemQuantity] = useState(1);
    // const [isOptionSelected, setIsOptionSelected] = useState(true);
    // const [selectedOption, setSelectedOption] = useState<string[]>([]);
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleDecrease = () => {
        if (itemQuantity >= 1) setitemQuantity(itemQuantity - 1);
    }

    const handleAdd = () => {
        setitemQuantity(itemQuantity + 1);
    }

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Form submitted');
        addCart(); // Call the function to add item to cart
        window.location.reload(); // Refresh the page
    }

    // const handleSelectionsChange = (selectedOptions: string[]) => {
    //     // Process the selectedOptions array as needed
    //     setSelectedOption(selectedOptions);
    // };
    const addCart = () => {
        const newItem = {
            name,
            price,
            quantity: itemQuantity,
            note: textAreaValue,
            // specialInstructions: selectedOption || [],
        }
        console.log('newItem:', newItem);
        // Retrieve existing cart data from local storage
        let cart: Cart = JSON.parse(localStorage.getItem('cart') || '{}');

        if (!cart || Object.keys(cart).length === 0) {
            cart = {
                restaurantName: restaurantName,
                storeid: storeId,
                items: []
            };
        }
        //if have same item, then add quantity
        let isSameItem = false;
        // cart.items.forEach((item) => {
        //     if (item.name === newItem.name && item.price === newItem.price && item.note === newItem.note && item.specialInstructions === newItem.specialInstructions) {
        //         item.quantity += newItem.quantity;
        //         isSameItem = true;
        //     }
        // });
        cart.items.forEach((item) => {
            if (item.name === newItem.name && item.price === newItem.price && item.note === newItem.note) {
                item.quantity += newItem.quantity;
                isSameItem = true;
            }
        });
        if (!isSameItem) {
            // Add new item to cart
            cart.items.push(newItem);
        } else {
            isSameItem = false;
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('Item added to cart:', newItem);
        console.log('Updated cart:', cart.items);
    }
    let cart: Cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const totalcost = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return (
        <Dialog>
            <DialogTrigger
                className="flex flex-col items-center w-[95%] max-w-xs bg-white rounded-2xl overflow-hidden shadow-lg "
            >
                <div
                    className="flex flex-col items-center w-full max-w-xs bg-white rounded-2xl overflow-hidden shadow-lg max-md:w-full"
                >
                    <div className="w-full">
                        <div className="relative w-full h-0" style={{ paddingBottom: '84%' }}>
                            <Image
                                src={uri}
                                alt={name}
                                width={86}
                                height={86}
                                className="absolute w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="px-4 py-5 w-full">
                        <h2 className="text-neutral-700 text-xl font-bold truncate">
                            {name}
                        </h2>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-red-600 text-xl">
                                NT ${price}
                            </span>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className='overflow-auto max-h-[90vh]'>
                <div className="relative w-full h-0 " style={{ paddingBottom: '84%' }}>
                    <Image
                        src={uri}
                        alt={name}
                        width={86}
                        height={86}
                        className="absolute w-full h-full"
                    />
                </div>
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-neutral-400 text-base leading-6 self-stretch whitespace-nowrap max-md:max-w-full">
                            {restaurantName}
                        </div>
                        <div className="justify-center text-neutral-950 text-2xl font-semibold leading-8 tracking-normal self-stretch mt-5 max-md:max-w-full">
                            {name}
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                    {/* {specialInstructions && <SpecialInstruction specialInstructions={specialInstructions} onOptionChange={setIsOptionSelected} onSelectionsChange={handleSelectionsChange} />} */}
                    <div className='pt-5 font-bold text-left'>note:</div>
                    <Textarea value={textAreaValue} onChange={handleTextAreaChange} />
                    <div className="self-stretch flex w-full items-center justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
                        <div className="text-black text-3xl font-semibold leading-[50.4px] my-auto">
                            NT${price * itemQuantity}
                        </div>
                        <div className="self-stretch flex items-center justify-between gap-5 max-md:justify-center">
                            <Button
                                className="items-stretch border self-stretch flex aspect-square flex-col p-3 rounded-lg mt-2"
                                onClick={() => handleDecrease()}
                                aria-label="Product Image"
                            >
                                -
                            </Button>
                            <div className="text-black text-center text-xl leading-6 tracking-tight opacity-[0.64] my-auto">
                                {itemQuantity}
                            </div>
                            <Button
                                className="items-stretch border self-stretch flex aspect-square flex-col p-3 rounded-lg mt-2"
                                onClick={() => handleAdd()}
                                aria-label="Product Image"
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    <div className='text-neutral-400 text-end'>Total Cost : {totalcost + price * itemQuantity}</div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => handleSubmit()}
                        // disabled={!isOptionSelected || itemQuantity < 1}
                        variant="destructive"
                    >
                        Add to Cart
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};