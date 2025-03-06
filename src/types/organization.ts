import { GetOrganization } from "@/models/organization";
import { GlobalApiResponseInterface } from "./global";

export interface GetOrganizationsApiResponse extends GlobalApiResponseInterface {
    data: GetOrganization[];
  }

  export interface GetOrganizationApiResponse extends GlobalApiResponseInterface {
    data?: GetOrganization | null;
  }