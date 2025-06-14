'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { useAuthentication } from "@/context/authContext";
import { logoutApi } from "@/api/requests/auth";

export const useLogout = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { signOut } = useAuthentication();
    const { showToast } = useToast();
    const { mutate, } = useMutation({
        mutationFn: logoutApi,
        onSuccess: async res =>{
            onSuccess && onSuccess();
            signOut && signOut();
            showToast({message: "You are logged out", type:'warning'})
        },
        onError(error:any, variables, context) {
            onError && onError();
            const errMsg = error?.response?.data?.message
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleLogout = () =>{
        mutate();
    }

    return {handleLogout}
}