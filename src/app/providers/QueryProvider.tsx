import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {FC} from "react";

interface QueryProviderProps {
  children: React.ReactNode,
}

const queryClient = new QueryClient();

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
}