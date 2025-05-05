'use client'
import { getUserProfileApi } from '@/api/requests/auth';
import { GetProfile } from '@/models/user';
import { LoginApiResponse } from '@/types/auth';
import { secureKeys } from '@/utils/secure-store';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
//#endregion

type AuthProviderProps = {
    children?: React.ReactNode
}

type AuthContextProps = {
    authUser?: GetProfile,
    session?:any,
    signIn?:(auth: LoginApiResponse)=>void,
    signOut?:()=>void
}

export const AuthContext = createContext<AuthContextProps>({});
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authUser, setAuthUser] = useState<GetProfile>();
    const router = useRouter();

    const signIn = async (auth: LoginApiResponse) =>{
        if(auth?.data){
            // setAuthUser(auth?.data?.token);
            await setCookie(secureKeys.tokenKey, auth.data?.token);
            const response = await getUserProfileApi();
            const profile = response?.data?.data as GetProfile;
            console.log("profile :>>>>>>>>", profile)
            if(profile){
                setAuthUser(profile);
                if(profile.survey_count <= 0 || profile.is_survey_ongoing){
                    router.replace("/survey");
                }
                if(profile.survey_count > 0){
                    router.replace("/dashboard");
                }
            }
        }
    }

    const signOut = async()=>{
        await deleteCookie(secureKeys.tokenKey);
        setAuthUser(undefined);
        router.replace("/");
    }
   
    return <AuthContext.Provider value={{
        authUser,
        signIn,
        signOut,
    }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthentication = () => useContext(AuthContext)