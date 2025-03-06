import { GetResilienceMeasure } from "./resilience-measure"

export type PostResilienceMeasureScale = {
    rm_id:number
    weight:number
    order:number
    name:string
}

export type UpdateResilienceMeasureScale = {
    id:number
    rm_id:number
    weight:number
    order:number
    name:string
}

export type GetResilienceMeasureScale = {
    id:number
    rm_id:number
    weight:number
    order:number
    name:string
    rm:GetResilienceMeasure
}