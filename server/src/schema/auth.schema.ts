import { number, object, string, TypeOf } from "zod";

export const SignInSchema = object({
  email: string({
    required_error: "Email is required",
  }),
  password: string({
    required_error: "Password is required",
  }),
});

export type SingInInput = TypeOf<typeof SignInSchema>;
