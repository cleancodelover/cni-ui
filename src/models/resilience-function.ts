import { GetResilienceTemporalDimension } from "./resilience-temporal-dimension"

export type PostResilienceFunction = {
    name: string
    rtd_id:number
}

export type UpdateResilienceFunction = {
    name: string
    rtd_id:number
    id:number
}

export type GetQuestionOption = {
    id: number;
    name: string;
    r_measure: string;
    weight: number;
    order: number;
  }
  
  export type GetQuestion = {
    id: number;
    name: string;
    r_control: string;
    order: number;
    options: GetQuestionOption[];
  }
  
  // export type GetResilienceControl = {
  //   id: number;
  //   name: string;
  //   r_function_category: string;
  //   questions: GetQuestion[];
  // }
  
  // export type GetResilienceCategory = {
  //   id: number;
  //   name: string;
  //   r_function: string;
  //   r_controls: GetResilienceControl[];
  // }
  
  // export type GetResilienceFunction = {
  //   id: number;
  //   name: string;
  //   r_temporal_dimension: string;
  //   r_category: GetResilienceCategory[];
  // }

  export interface GetResilienceFunctionQuestionOption {
    id: number;
    name: string;
    r_measure: string;
    weight: number;
    order: number;
  }
  
  export interface ResilienceFunctionQuestion {
    id: number;
    name: string;
    r_control: string;
    order: number;
    options: GetResilienceFunctionQuestionOption[];
    selectedOption?: number | null;
  }
  
  export interface GetResilienceControl {
    id: number;
    name: string;
    r_function_category: string;
    questions: ResilienceFunctionQuestion[];
  }
  
  export interface GetResilienceFunctionCategory {
    id: number;
    name: string;
    r_function: string;
    r_controls: GetResilienceControl[];
  }
  
  export interface GetResilienceFunction {
    id: number;
    name: string;
    r_temporal_dimension: string;
    r_category?: GetResilienceFunctionCategory[];
  }

  export type FormValues = {
    [key: string]: string; // questionId: optionId
  };