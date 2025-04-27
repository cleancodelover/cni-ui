import { RESILIENCE_FUNCTION_ENDPONT, RESILIENCE_FUNCTION_QUESTIONS_ENDPONT } from "@/api/endpoints";
import { apiHttpClient } from "@/api/http-client";
import { GetResilienceFunctionQuestionsApiResponse, GetResilienceFunctionsApiResponse } from "@/types/resilience-functions";
import { generateParamsWithUrl } from "@/utils/generate-query-params";

export const getResilienceFunctionsApi = async () =>{
    const endpoint = generateParamsWithUrl(RESILIENCE_FUNCTION_ENDPONT);
    try {
        const response = await apiHttpClient.get<GetResilienceFunctionsApiResponse>(endpoint);
        console.log("response :>>>>>>>>", response)
        return response;
    } catch (error:any) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}
export const getResilienceFunctionQuestionsApi = async (id:string) =>{
    const endpoint = generateParamsWithUrl(RESILIENCE_FUNCTION_QUESTIONS_ENDPONT);
    try {
        const response = await apiHttpClient.get<GetResilienceFunctionQuestionsApiResponse>(`${endpoint}/${id}`);
        console.log("response :>>>>>>>>", response)
        return response;
    } catch (error:any) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}