'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { createUserApi } from "@/api/requests/auth";
import { PostUser } from "@/models/user";

export const useSignup = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, isPending } = useMutation({
        mutationFn: createUserApi,
        onSuccess: async (res) =>{
            showToast({message: res?.data?.message, type:'success'})
            onSuccess && onSuccess();
        },
        onError(error:any, variables, context) {
            onError && onError();
            const errMsg =Object.values(error?.response?.data?.data).map((arr:any) => arr.join(', ')).join(', ')
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleSignUp = (data: PostUser) =>{
        mutate(data);
    }

    return { handleSignUp,loading: isPending }
}