import { GetOrganization } from "./organization"

export type PostUser = {
    full_name: string
    org_id: number
    phone_number: string
    email: string
    password: string
    password_confirmation:string
}

export type UpdateUser = {
    id:number
    full_name: string
    org_id: number
    phone_number: string
}

export type GetUser = {
    id:number
    full_name: string
    org_id: number
    phone_number: string
    org: GetOrganization
}