import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: new URL(import.meta.env.VITE_BACKEND_APP_URL),
      async headers() {
        return {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      },
    }),
  ],
});
