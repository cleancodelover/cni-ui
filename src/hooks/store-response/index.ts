'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { submitResponseApi } from "@/api/requests/resilience-functions";
import { FormValues } from "@/models/resilience-function";

export const useSubmitResponse = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, isPending } = useMutation({
        mutationFn: submitResponseApi,
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

    const handleSurveySubmit = (data: FormValues) =>{
        mutate(data);
    }

    return { handleSurveySubmit,loading: isPending }
}