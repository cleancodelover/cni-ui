import { useQueryKeys } from "@/api/react-query/keys";
import { getResilienceFunctionsApi, getUserSurveyResponseApi } from "@/api/requests/resilience-functions";
import { GetSurveyResponse } from "@/models/report";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSurveyResponse = () =>{
    const queryKey = [useQueryKeys.USER_SURVEY_RESPONSE];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getUserSurveyResponseApi});
    return {
        surveyData: data?.data?.data ?? {} as GetSurveyResponse,
        loading: isPending,
        error: isError,
    }
}