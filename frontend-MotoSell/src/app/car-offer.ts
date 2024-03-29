import { User } from "./user";

export interface CarOffer {
    id?: string;
    title: string;
    description: string;
    car_category: string;
    brand: string;
    model: string;
    manufacture_year: string;
    mileage: string;
    cubic_capacity: string;
    power: string;
    fuel_category: string;
    price: string;
    author: string;
    image?: File | null | string;
    pub_date: Date | null | string;
    isPublished: boolean;
    isDeleted: boolean;
}
