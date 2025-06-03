import {GetAllStatesResponse, State} from "@/types/state";

export default class StateService {
    static async getAll(baseUrl: string, token: string | null): Promise<GetAllStatesResponse> {
        const response = await fetch(`${baseUrl}/states`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                states: [],
                statusCode: response.status,
                message: data?.message || 'Erro desconhecido',
            };
        }

        return { states: data };
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
            return error
        }

        return response.json();
    }

    static async update(baseUrl: string, token: string | null, state: State, id: string): Promise<State> {
        const response = await fetch(`${baseUrl}/states/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(state)
        });

        if (!response.ok) {
            const error = await response.json()
            return error
        }

        return response.json();
    }

    static async delete(baseUrl: string, token: string | null, id: string): Promise<State> {
        const response = await fetch(`${baseUrl}/states/${id}`, {
            method: 'DELETE',
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

    static async getById(baseUrl: string, token: string | null, id: string): Promise<State> {
        const response = await fetch(`${baseUrl}/states/${id}`, {
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
}