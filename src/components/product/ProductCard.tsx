import {useCart} from "../../hooks/useCart.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import type {Product} from "../../types/Product.ts";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        await addToCart(product.id, 1);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img
                src={product.preview_image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">₴{product.price}</span>
                    <div className="space-x-2">
                        <a
                            href={`/product/${product.id}`}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            View
                        </a>
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};