export interface User {
    id: string;
    username: string;
    email: string;
    role: 'User' | 'Seller' | 'Administrator';
    firstName?: string;
    lastName?: string;
}