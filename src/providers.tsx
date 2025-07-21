import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 0, // refetch API every 0 ms (Polling)
        enabled: true, // Should API be called
        staleTime: 60 * 1000, // The time in ms after data is considered stale(old)
        gcTime: 5 * 60 * 1000, // The time in ms that unused/inactive cache data remains in memory
        refetchOnWindowFocus: false, // Refetch API on window focus
        refetchIntervalInBackground: false, // The query will continue to refetch while their tab/window is in the background
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: false, // Retry API on error
        retryDelay: 500,
        retryOnMount: false
      },
      mutations: {
        gcTime: 5 * 60 * 1000
      }
    }
  });

  return (
    <HeroUIProvider>
      <ToastProvider />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
