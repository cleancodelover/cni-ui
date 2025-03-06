import { GetResilienceFunction } from "./resilience-function"
import { GetResilienceFunctionCategory } from "./resilience-function-category"

export type PostResilienceControl = {
    rfc_id:number
    name: string
}

export type UpdateResilienceControl = {
    id:number
    rfc_id:number
    name: string
}

export type GetResilienceControl = {
    id:number
    rfc_id:number
    name: string
    rfc: GetResilienceFunctionCategory
}