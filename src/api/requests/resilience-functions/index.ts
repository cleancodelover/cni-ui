import { RESILIENCE_FUNCTION_ENDPONT, RESILIENCE_FUNCTION_QUESTIONS_ENDPONT, STORE_RESILIENCE_FUNCTION_ANSWERS_ENDPONT, USER_SURVEY_RESPONSE_ENDPONT } from "@/api/endpoints";
import { apiHttpClient } from "@/api/http-client";
import { FormValues } from "@/models/resilience-function";
import { GetResilienceFunctionQuestionsApiResponse, GetResilienceFunctionsApiResponse, GetSurveyResponsApiResponse } from "@/types/resilience-functions";
import { generateParamsWithUrl } from "@/utils/generate-query-params";

export const getResilienceFunctionsApi = async () =>{
    const endpoint = generateParamsWithUrl(RESILIENCE_FUNCTION_ENDPONT);
    try {
        const response = await apiHttpClient.get<GetResilienceFunctionsApiResponse>(endpoint);
        console.log("response :>>>>>>>>", response)
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}

export const getResilienceFunctionQuestionsApi = async (id?: number) => {
    const endpoint = generateParamsWithUrl(RESILIENCE_FUNCTION_QUESTIONS_ENDPONT);
    console.log("endpoint :>>>>>>>>>>", endpoint);
    try {

        const response = await apiHttpClient.get<GetResilienceFunctionQuestionsApiResponse>(`${endpoint}`);
        console.log("response :>>>>>>>>", response);
        return response;
    } catch (error: any) {
        console.log("Error :>>>>>>>>>>>>", error);
        throw error;
    }
};

export const submitResponseApi = async (data: FormValues) =>{
    try{
        console.log("Response :>>>>>>>>>>>>", data)
        const response = await apiHttpClient.post<GetSurveyResponsApiResponse>(STORE_RESILIENCE_FUNCTION_ANSWERS_ENDPONT, data, {});
        console.log("Response :>>>>>>>>>>>>", response)
        return response;
    }catch(error){
        console.log("Error :>>>>>>>>>>>>>>>", error)
        throw error;
    }
}

export const getUserSurveyResponseApi = async () =>{
    const endpoint = generateParamsWithUrl(USER_SURVEY_RESPONSE_ENDPONT);
    try {
        const response = await apiHttpClient.get<GetSurveyResponsApiResponse>(endpoint);
        console.log("response :>>>>>>>>", response)
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}