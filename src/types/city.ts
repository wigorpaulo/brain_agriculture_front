import {State} from "@/types/state";

export interface City {
    id: number;
    name: string;
    state: State;
    created_at: Date;
    updated_at: Date;
}