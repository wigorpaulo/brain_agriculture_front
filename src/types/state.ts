export interface State {
    id?: number;
    uf: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetAllStatesResponse {
    states: State[];
    statusCode?: number;
    message?: string;
}

export interface GetOneStateResponse {
    state: State | null;
    statusCode: number;
    message?: string;
}