import { GetSector } from "./sector"

export type PostOrganization = {
    name: string
    sector_id:number
}

export type UpdateOrganization = {
    id:number
    name: string
    sector_id:number
}

export type GetOrganization = {
    id:number
    name: string
    sector_id:number
    sector: GetSector
}