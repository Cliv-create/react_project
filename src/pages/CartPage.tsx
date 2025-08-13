import * as React from "react";
import type {Cart, ShippingDetails} from "../types/Cart.ts";
import {useCart} from "../hooks/useCart.ts";
import {cartProvider} from "../services/DIContainer.ts";

export const CartPage: React.FC = () => {
    const [cart, setCart] = React.useState<Cart | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [showShippingForm, setShowShippingForm] = React.useState(false);
    const [shippingDetails, setShippingDetails] = React.useState<ShippingDetails>({
        firstName: '',
        lastName: '',
        surname: '',
        phone: '',
        settlementName: '',
        streetName: '',
        address: ''
    });
    const { removeFromCart, updateCartShipping } = useCart();

    React.useEffect(() => {
        const loadCart = async () => {
            const cartId = window.location.pathname.split('/')[2];
            const cartData = await cartProvider.getCart(cartId);
            setCart(cartData);
            if (cartData?.shippingDetails) {
                setShippingDetails(cartData.shippingDetails);
            }
            setLoading(false);
        };

        loadCart();
    }, []);

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleRemoveItem = async (productId: string) => {
        await removeFromCart(productId);
        if (cart) {
            const updatedCart = await cartProvider.getCart(cart.id);
            setCart(updatedCart);
        }
    };

    const handleShippingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart) {
            await updateCartShipping(cart.id, shippingDetails);
            setShowShippingForm(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading cart...</div>;
    }

    if (!cart) {
        return <div className="text-center py-12">Cart not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{cart.name}</h1>

            {cart.items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <a href="/" className="text-blue-600 hover:text-blue-700">Continue Shopping</a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {cart.items.map(item => (
                                <div key={item.productId} className="p-6 border-b border-gray-200 last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.product.preview_image}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                            <p className="text-gray-600">${item.product.price} each</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-800">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => handleRemoveItem(item.productId)}
                                                className="text-red-600 hover:text-red-700 text-sm mt-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-800">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-800">$10.00</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span className="text-gray-800">Total</span>
                                    <span className="text-gray-800">${(calculateTotal() + 10).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-gray-400 text-white rounded-md cursor-not-allowed mb-3">
                                Payment Integration - Coming Soon
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Payment processing will be implemented here
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
                                <button
                                    onClick={() => setShowShippingForm(!showShippingForm)}
                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    {cart.shippingDetails ? 'Edit' : 'Add'}
                                </button>
                            </div>

                            {cart.shippingDetails && !showShippingForm ? (
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>{cart.shippingDetails.firstName} {cart.shippingDetails.lastName} {cart.shippingDetails.surname}</p>
                                    <p>{cart.shippingDetails.phone}</p>
                                    <p>{cart.shippingDetails.streetName} {cart.shippingDetails.address}</p>
                                    <p>{cart.shippingDetails.settlementName}</p>
                                </div>
                            ) : showShippingForm ? (
                                <form onSubmit={handleShippingSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={shippingDetails.firstName}
                                            onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={shippingDetails.lastName}
                                            onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
                                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Surname"
                                        value={shippingDetails.surname}
                                        onChange={(e) => setShippingDetails({...shippingDetails, surname: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={shippingDetails.phone}
                                        onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Settlement Name"
                                        value={shippingDetails.settlementName}
                                        onChange={(e) => setShippingDetails({...shippingDetails, settlementName: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Street Name"
                                        value={shippingDetails.streetName}
                                        onChange={(e) => setShippingDetails({...shippingDetails, streetName: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={shippingDetails.address}
                                        onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        required
                                    />
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowShippingForm(false)}
                                            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-gray-500 text-sm">No shipping details added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};