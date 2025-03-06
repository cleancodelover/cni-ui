'use client';
import AuthProvider from "../authContext";
import QueryProvider from "../queryContext";

type ProviderProps = {
    children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <QueryProvider>
      <AuthProvider>
            {children}
      </AuthProvider>
    </QueryProvider>
  );
}