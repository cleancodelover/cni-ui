export interface GlobalApiResponseInterface {
    message: string;
    count: number;
    statusCode: number;
    status: string;
  }

  export type HookOnSuccessType = () => void | null;
  export type HookOnErrorType = () => void | null;
  export type HookOnMutateType = () => void | null;