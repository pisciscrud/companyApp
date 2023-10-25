import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

const t = initTRPC.context<typeof createContext>().create();

const middleware = t.middleware;
const isAdmin = middleware(async (opts) => {
  try {
    const { ctx } = opts;

    const token = ctx.token; // откуда то из контекста достать токен
     console.log(token)
    const payload = AuthService.verifyToken(token);
    await UserService.getById(payload.id);

    return opts.next();
  } catch (error: any) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const router = t.router;
export const baseProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
