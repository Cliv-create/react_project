import type {Category} from "../../types/Category.ts";
import type {Product} from "../../types/Product.ts";

export interface IDataProvider {
    getProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    getProductsByCategory(categoryId: string): Promise<Product[]>;
    getCategories(): Promise<Category[]>;
    searchProducts(query: string): Promise<Product[]>;
}