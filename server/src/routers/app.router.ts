import { baseProcedure, router } from '../trpc';
import { companyRouter } from './company.router'

export const appRouter = router(
    {
        company: companyRouter
    }
)

export type AppRouter = typeof appRouter;