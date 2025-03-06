import { GetResilienceControl } from "./resilience-control"

export type PostResilienceMeasure = {
    rc_id:number
    order:number
    name:string
}

export type UpdateResilienceMeasure = {
    id:number
    rc_id:number
    order:number
    name:string
}

export type GetResilienceMeasure = {
    id:number
    rc_id:number
    order:number
    name:string
    rc: GetResilienceControl
}