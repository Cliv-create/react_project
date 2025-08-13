import type {IDataProvider} from "./interfaces/IDataProvider.ts";
import type {IAuthProvider} from "./interfaces/IAuthProvider.ts";
import type {ICartProvider} from "./interfaces/ICartProvider.ts";
import {LocalStorageDataProvider} from "./providers/LocalStorageDataProvider.ts";
import {LocalStorageAuthProvider} from "./providers/LocalStorageAuthProvider.ts";
import {LocalStorageCartProvider} from "./providers/LocalStorageCartProvider.ts";

class DIContainer {
    private static instance: DIContainer;
    private readonly dataProvider: IDataProvider;
    private readonly authProvider: IAuthProvider;
    private readonly cartProvider: ICartProvider;

    private constructor() {
        this.dataProvider = new LocalStorageDataProvider();
        this.authProvider = new LocalStorageAuthProvider();
        this.cartProvider = new LocalStorageCartProvider();
    }

    static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    getDataProvider(): IDataProvider {
        return this.dataProvider;
    }

    getAuthProvider(): IAuthProvider {
        return this.authProvider;
    }

    getCartProvider(): ICartProvider {
        return this.cartProvider;
    }
}

// Global providers
export const container = DIContainer.getInstance();
export const dataProvider = container.getDataProvider();
export const authProvider = container.getAuthProvider();
export const cartProvider = container.getCartProvider();