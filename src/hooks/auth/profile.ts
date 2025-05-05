import { useQueryKeys } from "@/api/react-query/keys";
import { getUserProfileApi } from "@/api/requests/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () =>{
    const queryKey = [useQueryKeys.USER_PROFILE];
    const { data, isPending, isError} = useQuery({queryKey:queryKey, queryFn: getUserProfileApi});
    return {
        profile: data?.data?.data ?? [],
        loading: isPending,
        error: isError,
    }
}