import { type } from "os";

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
        specialInstructions: string;
    };
export type CartCardProps = {
    username: string;
    time: string;
    item: Item[];
};