import type {ICartProvider} from "../interfaces/ICartProvider.ts";
import type {Cart} from "../../types/Cart.ts";
import {dataProvider} from "../DIContainer.ts";

export class LocalStorageCartProvider implements ICartProvider {
    private CARTS_KEY = 'marketplace_carts';

    async getCarts(userId: string): Promise<Cart[]> {
        const carts = this.getStoredCarts();
        const userCarts = carts.filter(c => c.userId === userId);

        if (userCarts.length === 0) {
            const defaultCart = await this.createCart(userId, 'Default Cart');
            return [defaultCart];
        }

        return userCarts;
    }

    async getCart(cartId: string): Promise<Cart | null> {
        const carts = this.getStoredCarts();
        return carts.find(c => c.id === cartId) || null;
    }

    async createCart(userId: string, name: string): Promise<Cart> {
        const cart: Cart = {
            id: Date.now().toString(),
            name,
            items: [],
            userId,
            createdAt: new Date()
        };

        const carts = this.getStoredCarts();
        carts.push(cart);
        localStorage.setItem(this.CARTS_KEY, JSON.stringify(carts));

        return cart;
    }

    async updateCart(cart: Cart): Promise<Cart> {
        const carts = this.getStoredCarts();
        const index = carts.findIndex(c => c.id === cart.id);

        if (index >= 0) {
            carts[index] = cart;
            localStorage.setItem(this.CARTS_KEY, JSON.stringify(carts));
        }

        return cart;
    }

    async deleteCart(cartId: string): Promise<void> {
        const carts = this.getStoredCarts();
        const filtered = carts.filter(c => c.id !== cartId);
        localStorage.setItem(this.CARTS_KEY, JSON.stringify(filtered));
    }

    async addItemToCart(cartId: string, productId: string, quantity: number): Promise<void> {
        const cart = await this.getCart(cartId);
        if (!cart) return;

        const product = await dataProvider.getProductById(productId);
        if (!product) return;

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                product
            });
        }

        await this.updateCart(cart);
    }

    async removeItemFromCart(cartId: string, productId: string): Promise<void> {
        const cart = await this.getCart(cartId);
        if (!cart) return;

        cart.items = cart.items.filter(item => item.productId !== productId);
        await this.updateCart(cart);
    }

    private getStoredCarts(): Cart[] {
        const cartsStr = localStorage.getItem(this.CARTS_KEY);
        return cartsStr ? JSON.parse(cartsStr) : [];
    }
}