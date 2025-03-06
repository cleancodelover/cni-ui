import { GetResilienceMeasure } from "./resilience-measure"
import { GetResilienceMeasureScale } from "./resilience-measure-scale"
import { GetUser } from "./user"

export type PostResilienceMeasureResponse = {
    rms_id:number
    rm_id:number
    user_id:number
}

export type UpdateResilienceMeasureResponse = {
    id:number
    rms_id:number
    rm_id:number
    user_id:number
}

export type GetResilienceMeasureResponse = {
    id:number
    rms_id:number
    rm_id:number
    user_id:number
    rms: GetResilienceMeasureScale
    rm:GetResilienceMeasure
    user: GetUser
}