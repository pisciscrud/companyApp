import { TRPCError } from "@trpc/server";
import { prisma } from "../prisma";

export class UserService {
  static async getByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[UserService getByEmail] User email provided has not exists`,
      });

    return user;
  }

  static async getById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[UserService getById] User ID provided has not exists`,
      });

    return user;
  }
}
