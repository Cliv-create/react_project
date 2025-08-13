// Data Provider Implementation
import type {IDataProvider} from "../interfaces/IDataProvider.ts";
import type {Product} from "../../types/Product.ts";
import type {Category} from "../../types/Category.ts";

const mockCategories: Category[] = [
    { id: '1', name: 'Electronics', parent_id: '0' },
    { id: '2', name: 'Books', parent_id: '0' },
    { id: '3', name: 'Smartphones', parent_id: '1' },
    { id: '4', name: 'Laptops', parent_id: '1' },
    { id: '5', name: 'Fiction', parent_id: '2' },
    { id: '6', name: 'Science', parent_id: '2' },
];

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro',
        id_category: '3',
        id_category_parent: '1',
        price: 999,
        quantity: 50,
        id_producer: 'apple',
        description: 'Latest iPhone with advanced features and excellent camera quality.',
        image: 'https://nanoreview.net/common/images/phone/apple-iphone-15-pro-mini@2x.jpeg',
        preview_image: 'https://nanoreview.net/common/images/phone/apple-iphone-15-pro-mini@2x.jpeg'
    },
    {
        id: '2',
        name: 'MacBook Air M2',
        id_category: '4',
        id_category_parent: '1',
        price: 1199,
        quantity: 30,
        id_producer: 'apple',
        description: 'Powerful and lightweight laptop perfect for work and creativity.',
        image: 'https://cdn.pixabay.com/photo/2024/03/09/15/01/macbook-air-8622749_960_720.png',
        preview_image: 'https://nanoreview.net/common/images/laptop/apple-macbook-air-15-m2-mini.jpeg'
    },
    {
        id: '3',
        name: 'The Great Gatsby',
        id_category: '5',
        id_category_parent: '2',
        price: 15,
        quantity: 100,
        id_producer: 'publisher1',
        description: 'Classic American novel by F. Scott Fitzgerald.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/250px-The_Great_Gatsby_Cover_1925_Retouched.jpg',
        preview_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/250px-The_Great_Gatsby_Cover_1925_Retouched.jpg'
    }
];

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