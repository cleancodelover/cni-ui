import { GetQuestion, GetResilienceFunction } from "@/models/resilience-function";
import { GlobalApiResponseInterface } from "./global";
import { GetSurveyResponse } from "@/models/report";

export interface GetResilienceFunctionsApiResponse extends GlobalApiResponseInterface {
    data: GetResilienceFunction[];
  }

  export interface GetResilienceFunctionApiResponse extends GlobalApiResponseInterface {
    data?: GetResilienceFunction | null;
  }

  export interface GetResilienceFunctionQuestionsApiResponse extends GlobalApiResponseInterface {
    data: GetResilienceFunction[];
  }

  export interface GetSurveyResponsApiResponse extends GlobalApiResponseInterface {
    data: GetSurveyResponse;
  }