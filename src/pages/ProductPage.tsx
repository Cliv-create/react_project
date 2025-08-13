import * as React from "react";
import type {Product} from "../types/Product.ts";
import {useCart} from "../hooks/useCart.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {dataProvider} from "../services/DIContainer.ts";

export const ProductPage: React.FC = () => {
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { addToCart } = useCart();
    const { user } = useAuth();

    React.useEffect(() => {
        const loadProduct = async () => {
            const productId = window.location.pathname.split('/')[2];
            const productData = await dataProvider.getProductById(productId);
            setProduct(productData);
            setLoading(false);
        };

        loadProduct();
    }, []);

    const handleAddToCart = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        if (product) {
            await addToCart(product.id, 1);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading product...</div>;
    }

    if (!product) {
        return <div className="text-center py-12">Product not found.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">{product.name}</h1>
                    <p className="text-3xl font-bold text-gray-800 mb-6">${product.price}</p>

                    <div className="space-y-4 mb-8">
                        <p className="text-gray-600">
                            <span className="font-semibold">Available:</span> {product.quantity} units
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Producer:</span> {product.id_producer}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
