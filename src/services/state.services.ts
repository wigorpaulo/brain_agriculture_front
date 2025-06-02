import {State} from "@/types/state";

export default class StateService {
    static async getAll(baseUrl: string, token: string | null): Promise<State[]> {
        const response = await fetch(`${baseUrl}/states`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json()
            return error
        }

        return response.json();
    }

    static async create(baseUrl: string, token: string | null, state: State): Promise<State> {
        const response = await fetch(`${baseUrl}/states`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(state)
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || 'Erro ao criar')
        }

        return response.json();
    }

    static async getOne(baseUrl: string, token: string | null, id: string): Promise<State> {
        const response = await fetch(`${baseUrl}/states/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error?.message || 'Erro ao buscar')
        }

        return response.json();
    }
}