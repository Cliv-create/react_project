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
                <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
                    <div
                        className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
                    >
                        <div className="flex gap-2">
                            <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white">{toast}</p>
                                <p className="text-gray-500"></p>
                            </div>
                        </div>
                        <button
                            className="text-gray-600 text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};