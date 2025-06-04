import {Response} from "@/types/response";
import {City, GetAllCitiesResponse, GetOneCityResponse} from "@/types/city";

export default class CityService {
    static async getAll(baseUrl: string, token: string | null): Promise<GetAllCitiesResponse> {
        const response = await fetch(`${baseUrl}/cities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                cities: [],
                statusCode: response.status,
                message: data?.message || 'Erro desconhecido',
            };
        }

        return { cities: data, statusCode: response.status };
    }

    static async create(baseUrl: string, token: string | null, city: City): Promise<Response> {
        const response = await fetch(`${baseUrl}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(city)
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                message: response?.statusText || 'Erro desconhecido',
            };
        }

        return { statusCode: response.status };
    }

    static async update(baseUrl: string, token: string | null, city: City, id: string): Promise<City> {
        const response = await fetch(`${baseUrl}/cities/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(city)
        });

        if (!response.ok) {
            const error = await response.json()
            return error
        }

        return response.json();
    }

    static async delete(baseUrl: string, token: string | null, id: string): Promise<Response> {
        const response = await fetch(`${baseUrl}/cities/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                message: response?.statusText || 'Erro desconhecido',
            };
        }

        return { statusCode: response.status };
    }

    static async getById(baseUrl: string, token: string | null, id: string): Promise<GetOneCityResponse> {
        const response = await fetch(`${baseUrl}/cities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return {
                city: null,
                statusCode: response.status,
                message: response?.statusText || 'Erro desconhecido',
            };
        }

        const data = await response.json();

        return { city: data, statusCode: response.status}
    }
}