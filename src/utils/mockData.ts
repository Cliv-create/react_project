import type {Category} from "../types/Category.ts";
import type {Product} from "../types/Product.ts";

export const mockCategories: Category[] = [
    { id: '1', name: 'Electronics', parent_id: '0' },
    { id: '2', name: 'Books', parent_id: '0' },
    { id: '3', name: 'Smartphones', parent_id: '1' },
    { id: '4', name: 'Laptops', parent_id: '1' },
    { id: '5', name: 'Fiction', parent_id: '2' },
    { id: '6', name: 'Science', parent_id: '2' },
];

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro',
        id_category: '3',
        id_category_parent: '1',
        price: 999,
        quantity: 50,
        id_producer: 'apple',
        description: 'Latest iPhone with advanced features and excellent camera quality.',
        image: 'https://via.placeholder.com/400x400?text=iPhone+15+Pro',
        preview_image: 'https://via.placeholder.com/200x200?text=iPhone+15+Pro'
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
        image: 'https://via.placeholder.com/400x400?text=MacBook+Air+M2',
        preview_image: 'https://via.placeholder.com/200x200?text=MacBook+Air+M2'
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
        image: 'https://via.placeholder.com/400x400?text=The+Great+Gatsby',
        preview_image: 'https://via.placeholder.com/200x200?text=The+Great+Gatsby'
    }
];