// Data Provider Implementation
import type {IDataProvider} from "../interfaces/IDataProvider.ts";
import type {Product} from "../../types/Product.ts";
import type {Category} from "../../types/Category.ts";
import {mockCategories, mockProducts} from "../../utils/mockData.ts";

export class LocalStorageDataProvider implements IDataProvider {
    async getProducts(): Promise<Product[]> {
        return mockProducts;
    }

    async getProductById(id: string): Promise<Product | null> {
        return mockProducts.find(p => p.id === id) || null;
    }

    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        return mockProducts.filter(p => p.id_category === categoryId);
    }

    async getCategories(): Promise<Category[]> {
        return mockCategories;
    }

    async searchProducts(query: string): Promise<Product[]> {
        const lowercaseQuery = query.toLowerCase();
        return mockProducts.filter(p =>
            p.name.toLowerCase().includes(lowercaseQuery) ||
            p.description.toLowerCase().includes(lowercaseQuery)
        );
    }
}