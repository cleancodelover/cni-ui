import { GetResilienceFunction } from "@/models/resilience-function";
import { GlobalApiResponseInterface } from "./global";

export interface GetResilienceFunctionsApiResponse extends GlobalApiResponseInterface {
    data: GetResilienceFunction[];
  }

  export interface GetResilienceFunctionApiResponse extends GlobalApiResponseInterface {
    data?: GetResilienceFunction | null;
  }

  export interface GetResilienceFunctionQuestionsApiResponse extends GlobalApiResponseInterface {
    data: GetResilienceFunction[];
  }