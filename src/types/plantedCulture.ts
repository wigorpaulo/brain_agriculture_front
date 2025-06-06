import {User} from "@/types/user";

export interface PlantedCulture {
    id?: number;
    name: string;
    created_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetAllPlantedCulturesResponse {
    plantedCultures: PlantedCulture[];
    statusCode?: number;
    message?: string;
}

export interface GetOnePlantedCultureResponse {
    plantedCulture: PlantedCulture | null;
    statusCode: number;
    message?: string;
}