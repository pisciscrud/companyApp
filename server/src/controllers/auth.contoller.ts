import { TRPCError } from "@trpc/server";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async signIn({
    input,
  }: {
    input: { password: string; email: string };
  }) {
    try {
      const data = await AuthService.signIn(input.email, input.password);
      return {
        status: "success",
        data: {
          data,
        },
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[AuthController signIn] ${error?.message || error?.stack}`,
      });
    }
  }
 
}
