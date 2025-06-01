// src/services/auth.service.ts
import {User} from "@/types/user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string
    user: User
    message: string
    statusCode: number
}

export class AuthService {
    static async login(baseUrl: string, payload: LoginPayload): Promise<LoginResponse> {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const error = await response.json();
            console.log('WIGOR error >> ', error);
            return error;
        }

        return response.json()
    }

    static async logout(): Promise<void> {
        await fetch(`${this.BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include' // se usar cookie
        })
    }
}
