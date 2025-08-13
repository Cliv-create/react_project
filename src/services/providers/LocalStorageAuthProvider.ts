import type {IAuthProvider} from "../interfaces/IAuthProvider.ts";
import type {User} from "../../types/User.ts";

export class LocalStorageAuthProvider implements IAuthProvider {
    private USERS_KEY = 'marketplace_users';
    private CURRENT_USER_KEY = 'marketplace_current_user';

    async login(username: string, password: string): Promise<User | null> {
        const users = this.getStoredUsers();
        const user = users.find(u => u.username === username);

        if (user && password === 'password') { // Simple password check for demo
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    }

    async register(username: string, email: string, password: string): Promise<User | null> {
        const users = this.getStoredUsers();

        if (users.find(u => u.username === username || u.email === email)) {
            return null; // User exists
        }

        const newUser: User = {
            id: Date.now().toString(),
            username,
            email,
            role: 'User'
        };

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));

        return newUser;
    }

    async logout(): Promise<void> {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    async getCurrentUser(): Promise<User | null> {
        const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    async isAuthenticated(): Promise<boolean> {
        return localStorage.getItem(this.CURRENT_USER_KEY) !== null;
    }

    private getStoredUsers(): User[] {
        const usersStr = localStorage.getItem(this.USERS_KEY);
        return usersStr ? JSON.parse(usersStr) : [];
    }
}