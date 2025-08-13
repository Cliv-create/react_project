import type {Product} from "../../types/Product.ts";
import {ProductCard} from "./ProductCard.tsx";

export const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};