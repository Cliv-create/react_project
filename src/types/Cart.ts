import type {Product} from "./Product.ts";

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}

export interface ShippingDetails {
    firstName: string;
    lastName: string;
    surname: string;
    phone: string;
    settlementName: string;
    streetName: string;
    address: string;
}

export interface Cart {
    id: string;
    name: string;
    items: CartItem[];
    shippingDetails?: ShippingDetails;
    userId: string;
    createdAt: Date;
}