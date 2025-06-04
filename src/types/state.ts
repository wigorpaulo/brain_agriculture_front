export interface State {
    id: number;
    uf: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface GetAllStatesResponse {
    states: State[];
    statusCode?: number;
    message?: string;
}

export interface DeleteStateResponse {
    statusCode?: number;
    message?: string;
}