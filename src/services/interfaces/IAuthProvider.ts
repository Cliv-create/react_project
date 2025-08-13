import type {User} from "../../types/User.ts";

export interface IAuthProvider {
    login(username: string, password: string): Promise<User | null>;
    register(username: string, email: string, password: string): Promise<User | null>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    isAuthenticated(): Promise<boolean>;
}