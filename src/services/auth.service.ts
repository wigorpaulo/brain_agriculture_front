// src/services/auth.service.ts
export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
    user: {
        id: number
        nome: string
        email: string
    }
}

export class AuthService {
    private static BASE_URL = 'http://localhost:3000'

    static async login(payload: LoginPayload): Promise<LoginResponse> {
        const response = await fetch(`${this.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || 'Erro ao autenticar')
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
