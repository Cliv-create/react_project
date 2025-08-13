import * as React from "react";
import type {Product} from "../types/Product.ts";
import {dataProvider} from "../services/DIContainer.ts";
import {ProductGrid} from "../components/product/ProductGrid.tsx";

export const HomePage: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadProducts = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');

            if (searchQuery) {
                const searchResults = await dataProvider.searchProducts(searchQuery);
                setProducts(searchResults);
            } else {
                const allProducts = await dataProvider.getProducts();
                setProducts(allProducts);
            }
            setLoading(false);
        };

        loadProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading products...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {new URLSearchParams(window.location.search).get('search')
                    ? `Search Results for "${new URLSearchParams(window.location.search).get('search')}"`
                    : 'All Products'}
            </h1>
            <ProductGrid products={products} />
        </div>
    );
};