import type {Product} from "../types/Product.ts";
import type {Category} from "../types/Category.ts";
import * as React from "react";
import { useParams } from "react-router";
import {dataProvider} from "../services/DIContainer.ts";
import {ProductGrid} from "../components/product/ProductGrid.tsx";

export const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = React.useState<Product[]>([]);
    const [category, setCategory] = React.useState<Category | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadCategoryProducts = async () => {
            const categoryId = window.location.pathname.split('/')[2];
            const categories = await dataProvider.getCategories();
            const currentCategory = categories.find(c => c.id === categoryId);

            if (currentCategory) {
                setCategory(currentCategory);
                const categoryProducts = await dataProvider.getProductsByCategory(categoryId);
                setProducts(categoryProducts);
            }
            setLoading(false);
        };

        loadCategoryProducts();
    }, [categoryId]);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!category) {
        return <div className="text-center py-12">Category not found.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{category.name}</h1>
            <ProductGrid products={products} />
        </div>
    );
};