import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "./prisma";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

export async function createInnerTRPCContext(opts?: any) {
  return {
    prisma,
    ...opts,
  };
}

export const createContext = async (opts?: CreateExpressContextOptions) => {
  function getUserFromHeader() {
    console.log(opts?.req?.headers);
    if (opts?.req?.headers.authorization) {
      const token = opts?.req.headers.authorization.split(" ")[1];
      return token;
    }
    return null;
  }
  const innerContext = await createInnerTRPCContext({
    req: opts?.req,
    token: getUserFromHeader(),
  });

  return {
    ...innerContext,
    req: opts?.req,
  };
};
