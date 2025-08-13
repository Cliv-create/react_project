import type {Cart} from "../../types/Cart.ts";

export interface ICartProvider {
    getCarts(userId: string): Promise<Cart[]>;
    getCart(cartId: string): Promise<Cart | null>;
    createCart(userId: string, name: string): Promise<Cart>;
    updateCart(cart: Cart): Promise<Cart>;
    deleteCart(cartId: string): Promise<void>;
    addItemToCart(cartId: string, productId: string, quantity: number): Promise<void>;
    removeItemFromCart(cartId: string, productId: string): Promise<void>;
}