import { Position } from "@prisma/client";
import { z, number, object, string, TypeOf } from "zod";

export const CREATE_EMPLOYEE_SCHEMA = object({
  firstName: string({
    required_error: "Name is required",
  }),
  lastName: string({
    required_error: "Last name is required",
  }),
  departmentId: number({
    required_error: "Departament is required",
  }),
  position: z.enum([Position.EMPLOYEE, Position.HEAD]),
});

export const employeeParams = object({
  employeeId: number(),
});

export const paramName = object({
  companyId: number(),
  name: string(),
});

export const UPDATE_EMPLOYEE_SCHEMA = object({
  params: employeeParams,
  body: object({
    firstName: string(),
    lastName: string(),
    position: z.enum([Position.EMPLOYEE, Position.HEAD]),
    departmentId: number(),
  }).partial(),
});

export type CreateEmployeeInput = TypeOf<typeof CREATE_EMPLOYEE_SCHEMA>;
export type ParamsInput = TypeOf<typeof employeeParams>;
export type ParamInputName = TypeOf<typeof paramName>;
export type UpdateEmployeeInput = TypeOf<typeof UPDATE_EMPLOYEE_SCHEMA>["body"];
