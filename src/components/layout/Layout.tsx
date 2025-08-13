import {TopBar} from "./TopBar.tsx";
import {Sidebar} from "./Sidebar.tsx";
import {useCart} from "../../hooks/useCart.ts";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { toast } = useCart();

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {toast && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
};