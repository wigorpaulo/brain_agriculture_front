import {State} from "@/types/state";

export interface City {
    id?: number;
    name: string;
    state: State;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetAllCitiesResponse {
    cities: City[];
    statusCode?: number;
    message?: string;
}

export interface GetOneCityResponse {
    city: City | null;
    statusCode: number;
    message?: string;
}