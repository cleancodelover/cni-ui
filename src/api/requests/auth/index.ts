import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER, USER_PROFILE_ENDPONT, USERS_ENDPONT } from "@/api/endpoints";
import { apiHttpClient } from "@/api/http-client";
import { PostLogin } from "@/models/auth";
import { PostUser, UpdateUser } from "@/models/user";
import { GetUserApiResponse, GetUserProfileApiResponse, LoginApiResponse, LogoutApiResponse } from "@/types/auth";

export const loginApi = async (data: PostLogin) =>{
    try{
        const response = await apiHttpClient.post<LoginApiResponse>(LOGIN_ENDPOINT, data, {});
        return response;
    }catch(error){
        console.log("Error :>>>>>>>>>>>>>>>", error)
        throw error;
    }
}

export const logoutApi = async () =>{
    try{
        const response = await apiHttpClient.get<LogoutApiResponse>(LOGOUT_ENDPOINT);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const createUserApi = async (data: PostUser) =>{
    try{
        console.log("Response :>>>>>>>>>>>>", data)
        const response = await apiHttpClient.post<GetUserApiResponse>(REGISTER, data, {});
        console.log("Response :>>>>>>>>>>>>", response)
        return response;
    }catch(error){
        console.log("Error :>>>>>>>>>>>>>>>", error)
        throw error;
    }
}

export const updateUserApi = async (data: UpdateUser) =>{
    try{
        const response = await apiHttpClient.put<GetUserApiResponse>(USERS_ENDPONT, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}


export const getUserProfileApi = async () =>{
    try {
        const response = await apiHttpClient.get<GetUserProfileApiResponse>(USER_PROFILE_ENDPONT);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}