import type {Cart, ShippingDetails} from "../types/Cart.ts";
import * as React from "react";
import {cartProvider} from "../services/DIContainer.ts";
import {AuthContext} from "./AuthContext.tsx";

export const CartContext = React.createContext<{
    carts: Cart[];
    activeCart: Cart | null;
    setActiveCart: (cart: Cart) => void;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    createCart: (name: string) => Promise<void>;
    deleteCart: (cartId: string) => Promise<void>;
    updateCartShipping: (cartId: string, details: ShippingDetails) => Promise<void>;
    showToast: (message: string) => void;
    toast: string | null;
}>({
    carts: [],
    activeCart: null,
    setActiveCart: () => {},
    addToCart: async () => {},
    removeFromCart: async () => {},
    createCart: async () => {},
    deleteCart: async () => {},
    updateCartShipping: async () => {},
    showToast: () => {},
    toast: null,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    const [carts, setCarts] = React.useState<Cart[]>([]);
    const [activeCart, setActiveCartState] = React.useState<Cart | null>(null);
    const [toast, setToast] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (user) {
            loadCarts();
        }
    }, [user]);

    const loadCarts = async () => {
        if (!user) return;
        const userCarts = await cartProvider.getCarts(user.id);
        setCarts(userCarts);
        if (!activeCart && userCarts.length > 0) {
            setActiveCartState(userCarts[0]);
        }
    };

    const setActiveCart = (cart: Cart) => {
        setActiveCartState(cart);
    };

    const addToCart = async (productId: string, quantity: number) => {
        if (!activeCart) return;
        await cartProvider.addItemToCart(activeCart.id, productId, quantity);
        await loadCarts();
        showToast(`Added to ${activeCart.name}`);
    };

    const removeFromCart = async (productId: string) => {
        if (!activeCart) return;
        await cartProvider.removeItemFromCart(activeCart.id, productId);
        await loadCarts();
    };

    const createCart = async (name: string) => {
        if (!user) return;
        await cartProvider.createCart(user.id, name);
        await loadCarts();
    };

    const deleteCart = async (cartId: string) => {
        await cartProvider.deleteCart(cartId);
        await loadCarts();
        if (activeCart?.id === cartId && carts.length > 1) {
            const remainingCarts = carts.filter(c => c.id !== cartId);
            setActiveCartState(remainingCarts[0]);
        }
    };

    const updateCartShipping = async (cartId: string, details: ShippingDetails) => {
        const cart = await cartProvider.getCart(cartId);
        if (cart) {
            cart.shippingDetails = details;
            await cartProvider.updateCart(cart);
            await loadCarts();
        }
    };

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <CartContext.Provider value={{
            carts,
            activeCart,
            setActiveCart,
            addToCart,
            removeFromCart,
            createCart,
            deleteCart,
            updateCartShipping,
            showToast,
            toast,
        }}>
            {children}
        </CartContext.Provider>
    );
};