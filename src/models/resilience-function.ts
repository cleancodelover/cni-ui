import { GetResilienceTemporalDimension } from "./resilience-temporal-dimension"

export type PostResilienceFunction = {
    name: string
    rtd_id:number
}

export type UpdateResilienceFunction = {
    name: string
    rtd_id:number
    id:number
}

export type GetResilienceFunction = {
    id:number
    name: string
    rtd_id:number
    rtd: GetResilienceTemporalDimension
}