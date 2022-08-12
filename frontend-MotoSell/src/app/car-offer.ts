import { User } from "./user";

export interface CarOffer {
    title: string;
    description: string;
    car_category: string;
    brand: string;
    model: string;
    manufacture_year: number;
    mileage: number;
    cubic_capacity: number;
    power: number;
    fuel_category: string;
    author: User;
    image: string;
    pub_date: Date;
}
