import {  object, string, TypeOf } from "zod";

export const LOGIN_FORM_SCHEMA = object({
  email: string({
    required_error: "Email is required",
  }),
  password: string({
    required_error: "Password is required",
  }),
});

export type SingInInput = TypeOf<typeof LOGIN_FORM_SCHEMA>;
