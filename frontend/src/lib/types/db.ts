export type SpecialInstruction = {
    name: string;
    required: boolean;
    options: string[];
};

export type SpecialInstructionsProps = {
    specialInstructions?: SpecialInstruction[];
};

export type AddButtonProps = {
    url: string;
};

export type CardProps = {
    uri: string;
    name: string;
    starNumber: number;
    likes?: boolean;
};

export type CardPriceProps = {
    uri: string;
    name: string;
    price: number;
    specialInstructions?: SpecialInstruction[];
}; 
export type CategoryProps = {
    uri: string;
    name: string;
};

export type RestaurantCardProps = {
    name: string;
    imageSrc: string;
    starNumber: number;
    address: string;
    likes: boolean;
};

export type Item = {
    name: string;
    price: number;
    quantity: number;
    note?: string;
    specialInstructions?: string[];
};

export type CartCardProps = {
    username: string;
    time: string;
    item: Item[];
};

export interface LocationContextType {
    location: string | null;
    setLocation: (location: string) => void;
}
