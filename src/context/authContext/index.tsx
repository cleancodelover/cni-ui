'use client'
import { LoginApiResponse } from '@/types/auth';
import { removeFromSecureStore, saveToSecureStore, secureKeys } from '@/utils/secure-store';
import React, { createContext, useContext, useState } from 'react';
//#endregion

type AuthProviderProps = {
    children?: React.ReactNode
}

type AuthContextProps = {
    authUser?: string,
    session?:any,
    signIn?:(auth: LoginApiResponse)=>void,
    signOut?:()=>void
}

export const AuthContext = createContext<AuthContextProps>({});
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authUser, setAuthUser] = useState<string>();

    const signIn = async (auth: LoginApiResponse) =>{
        console.log("auth :>>>>>>>>>>>>>>>", auth);
        if(auth?.data){
            setAuthUser(auth?.data?.token);
            await saveToSecureStore(secureKeys.tokenKey, auth.data?.token);
        }
    }

    const signOut = async()=>{
        await removeFromSecureStore(secureKeys.tokenKey);
        setAuthUser(undefined);
    }
   
    return <AuthContext.Provider value={{
        authUser,
        signIn,
        signOut,
    }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthentication = () => useContext(AuthContext)