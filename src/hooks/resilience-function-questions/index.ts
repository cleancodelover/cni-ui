import { useQueryKeys } from "@/api/react-query/keys";
import { getResilienceFunctionsApi } from "@/api/requests/resilience-functions";
import { useQuery } from "@tanstack/react-query";

export const useGetResilienceFunctionQuestions = () =>{
    const queryKey = [useQueryKeys.RESILIENCE_FUNCTIONS];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getResilienceFunctionsApi});
    return {
        questions: data?.data?.data ?? [],
        loading: isPending,
        error: isError,
    }
}