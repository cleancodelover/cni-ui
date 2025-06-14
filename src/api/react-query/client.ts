import {QueryClient} from "@tanstack/react-query";

export const globalQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const clearQueryClient = () => {
  globalQueryClient.clear();
};