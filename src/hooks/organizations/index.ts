import { useQueryKeys } from "@/api/react-query/keys";
import { getOrganizationsApi } from "@/api/requests/organizations";
import { useQuery } from "@tanstack/react-query";

export const useGetOrganizations = () =>{
    const queryKey = [useQueryKeys.ORGANIZATIONS];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getOrganizationsApi});
    return {
        authors: data?.data?.data,
        loading: isPending,
        error: isError,
    }
}