import {User} from "@/types/user";
import {City} from "@/types/city";

export interface Producer {
    id?: number;
    cpf_cnpj: string;
    name: string;
    city: City;
    created_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export interface GetAllProducerResponse {
    producers: Producer[];
    statusCode?: number;
    message?: string;
}

export interface GetOneProducerResponse {
    producer: Producer | null;
    statusCode: number;
    message?: string;
}