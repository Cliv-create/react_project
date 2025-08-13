import * as React from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {useCart} from "../../hooks/useCart.ts";

export function TopBar() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const { user, logout } = useAuth();
    const { activeCart, carts, setActiveCart } = useCart();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results
            window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <a href="/" className="text-2xl font-bold text-blue-800">MkT</a>
                </div>

                <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </form>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {carts.length > 1 && (
                                <select
                                    value={activeCart?.id || ''}
                                    onChange={(e) => {
                                        const cart = carts.find(c => c.id === e.target.value);
                                        if (cart) setActiveCart(cart);
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                >
                                    {carts.map(cart => (
                                        <option key={cart.id} value={cart.id}>
                                            {cart.name} ({cart.items.length})
                                        </option>
                                    ))}
                                </select>
                            )}
                            <a href={`/cart/${activeCart?.id}`} className="text-gray-600 hover:text-gray-800">
                                Cart ({activeCart?.items.length || 0})
                            </a>
                            <span className="text-gray-600">Hello, {user.username}</span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                                Login
                            </a>
                            <a href="/register" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Register
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};