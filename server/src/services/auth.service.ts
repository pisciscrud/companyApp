import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { UserService } from "./user.service";
import jwtService from "jsonwebtoken";

export class AuthService {
  static async signIn(email: string, password: string) {
    const user = await UserService.getByEmail(email);

    const passwordHash = await bcrypt.compare(password, user.password);

    if (!passwordHash)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `[AuthService signIn] Password or email do not match`,
      });

    const jwt = jwtService.sign({ id: user.id }, process.env.SECRET as string);

    return { jwt };
  }

  static verifyToken(token: string) {
    const payload = jwtService.verify(token, process.env.SECRET as string) as {
      id: number;
    };
    return payload;
  }
}
