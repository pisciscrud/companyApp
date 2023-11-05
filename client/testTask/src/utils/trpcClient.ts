import type { AppRouter } from "../../../../server/src/routers/app.router";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
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
