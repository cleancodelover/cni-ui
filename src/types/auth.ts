import { AccessToken } from "@/models/auth";
import { GlobalApiResponseInterface } from "./global";
import { GetProfile, GetUser } from "@/models/user";

export interface LoginApiResponse extends GlobalApiResponseInterface {
    data?: AccessToken | null;
}

export interface LogoutApiResponse extends GlobalApiResponseInterface {
    data?: null;
}

export interface GetUserApiResponse extends GlobalApiResponseInterface {
    data?: GetUser;
}

export interface GetUserProfileApiResponse extends GlobalApiResponseInterface {
    data?: GetProfile;
}