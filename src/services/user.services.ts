export interface User {
    name: string;
    email: string;
    password: string;
    message?: string
    statusCode?: number
}

export class UserServices {
    private static BASE_URL = 'http://localhost:3000';

    static async getAll(): Promise<User[]> {
        const response = await fetch(`${this.BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || 'Erro ao autenticar')
        }

        return response.json();
    }

    static async create(user: User): Promise<User> {
        const response = await fetch(`${this.BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || 'Erro ao autenticar')
        }

        return response.json();
    }
}