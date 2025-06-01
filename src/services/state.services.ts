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
            throw new Error(error?.message || 'Erro ao autenticar')
        }

        return response.json();
    }

    static async create(baseUrl: string, token: string | null, state: State): Promise<State> {
        console.log('Wigor state >> ', state);
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
}