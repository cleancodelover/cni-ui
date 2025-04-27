import { useQueryKeys } from "@/api/react-query/keys";
import { getResilienceFunctionsApi } from "@/api/requests/resilience-functions";
import { useQuery } from "@tanstack/react-query";

export const useGetResilienceFunctions = () =>{
    const queryKey = [useQueryKeys.RESILIENCE_FUNCTIONS];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getResilienceFunctionsApi});
    return {
        resilience_functions: data?.data?.data ?? [],
        loading: isPending,
        error: isError,
    }
}