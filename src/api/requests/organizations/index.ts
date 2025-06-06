import { ORGANIZATIONS } from "@/api/endpoints";
import { apiHttpClient } from "@/api/http-client";
import { GetOrganizationsApiResponse } from "@/types/organization";
import { generateParamsWithUrl } from "@/utils/generate-query-params";

export const getOrganizationsApi = async () =>{
    const endpoint = generateParamsWithUrl(ORGANIZATIONS);
    try {
        const response = await apiHttpClient.get<GetOrganizationsApiResponse>(endpoint);
        console.log("response :>>>>>>>>", response)
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;

    }
}