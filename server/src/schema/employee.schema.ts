import { Position } from "@prisma/client";
import { z, number, object, string, TypeOf } from "zod";

export const CreateEmployeeSchema = object({
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
  idEmployee: number(),
});

export const paramName = object({
  name: string(),
});

export const UpdateEmployeeSchema = object({
  params: employeeParams,
  body: object({
    firstName: string(),
    lastName: string(),
    position: z.enum([Position.EMPLOYEE, Position.HEAD]),
    departmentId: number(),
  }).partial(),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type CreateEmployeeInput = TypeOf<typeof CreateEmployeeSchema>;
export type ParamsInput = TypeOf<typeof employeeParams>;
export type ParamInputName = TypeOf<typeof paramName>;
export type UpdateEmployeeInput = TypeOf<typeof UpdateEmployeeSchema>["body"];
export type FilterQueryInput = TypeOf<typeof filterQuery>;
