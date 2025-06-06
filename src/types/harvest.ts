import {User} from "@/types/user";

export interface Harvest {
    id?: number;
    name: string;
    created_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetAllHarvestsResponse {
    harvests: Harvest[];
    statusCode?: number;
    message?: string;
}

export interface GetOneHarvestResponse {
    harvest: Harvest | null;
    statusCode: number;
    message?: string;
}