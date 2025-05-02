import { useQueryKeys } from "@/api/react-query/keys";
import { getResilienceFunctionQuestionsApi } from "@/api/requests/resilience-functions";
import { useQuery } from "@tanstack/react-query";

export const useGetResilienceFunctionQuestions = (id?:number) =>{
    const queryKey = [useQueryKeys.RESILIENCE_FUNCTIONS];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: ()=> getResilienceFunctionQuestionsApi(id)});
    return {
        questions: data?.data?.data ?? [],
        loading: isPending,
        error: isError,
    }
}