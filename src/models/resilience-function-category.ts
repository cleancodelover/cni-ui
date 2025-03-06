import { GetResilienceFunction } from "./resilience-function"

export type PostResilienceFunctionCategory = {
    rf_id:number
    name: string
}

export type GetResilienceFunctionCategory = {
    id:number
    rf_id:number
    name: string
    rf: GetResilienceFunction
}


export type UpdateResilienceFunctionCategory = {
    id:number
    rf_id:number
    name: string
}