import { router } from "../trpc";
import { companyRouter } from "./company.router";
import { departamentRouter } from "./departament.router";
import { employeeRouter } from "./employee.router";
import { authRouter } from "./auth.router";

export const appRouter = router({
  auth: authRouter,
  company: companyRouter,
  departament: departamentRouter,
  employee: employeeRouter,
});

export type AppRouter = typeof appRouter;
