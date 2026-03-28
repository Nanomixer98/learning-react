import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { appRouter } from "./app.router";
import { useAuthStore } from "./auth/store/auth.store";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {/* The rest of your application */}
        <CheckAuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
      </QueryClientProvider>
    </>
  );
};
