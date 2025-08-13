import * as React from "react";
import type {Category} from "../../types/Category.ts";
import {dataProvider} from "../../services/DIContainer.ts";

export function Sidebar() {
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
        const loadCategories = async () => {
            const cats = await dataProvider.getCategories();
            setCategories(cats);
        };
        loadCategories();
    }, []);

    // Placeholder
    const rootCategories = categories.filter(c => c.parent_id === '0');

    const renderCategories = (parentId: string, level: number = 0) => {
        const children = categories.filter(c => c.parent_id === parentId);

        return children.map(category => (
            <div key={category.id} className={`ml-${level * 4}`}>
                <a
                    href={`/category/${category.id}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                    {category.name}
                </a>
                {renderCategories(category.id, level + 1)}
            </div>
        ));
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                <nav>
                    <a
                        href="/"
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md mb-2"
                    >
                        All Products
                    </a>
                    {renderCategories('0')}
                </nav>
            </div>
        </div>
    );
};