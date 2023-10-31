import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../../server/src/routers/app.router";

export const trpc = createTRPCProxyClient<AppRouter>({
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
