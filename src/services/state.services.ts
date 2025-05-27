export class StateService {
    private static BASE_URL = 'http://localhost:3000';

    static async getAll(token: string | null): Promise<any> {
        const response = await fetch(`${this.BASE_URL}/states`, {
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
}