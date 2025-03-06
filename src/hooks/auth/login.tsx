
import { useAuthentication } from "@/context/authContext";
import { HookOnErrorType, HookOnSuccessType } from "@/types/global";
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { loginApi } from "@/api/requests/auth";
import { LoginApiResponse } from "@/types/auth";
import { PostLogin } from "@/models/auth";

export const useLogin = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { signIn } = useAuthentication();
    const { showToast } = useToast();
    const { mutate, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: async res =>{
            signIn && signIn(res?.data as LoginApiResponse);
            showToast({message: res?.data.message, type:'success'})
            onSuccess && onSuccess();
        },
        onError(error:any, variables:PostLogin, context) {
            onError && onError();
            const errMsg = error?.response?.data?.message
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleLogin = (data: PostLogin) =>{
        mutate(data);
    }

    return { handleLogin, loading: isPending  }
}