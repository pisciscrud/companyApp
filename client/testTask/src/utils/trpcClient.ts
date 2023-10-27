import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { authHeader } from '../api/auth.api';
import type { AppRouter } from '../../../../server/src/routers/app.router';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});