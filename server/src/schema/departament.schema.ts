import { number, object, string, TypeOf } from "zod";

export const CREATE_DEPARTMENT_SCHEMA = object({
  name: string({
    required_error: "Name is required",
  }),
  companyId: number({
    required_error: "Company is required",
  }),
  description: string({
    required_error: "Descriprion is required",
  }),
});

export const paramDepartament = object({
  departmentId: number(),
});

export const paramCompany = object({
  companyId: number(),
});

export const UPDATE_DEPARTMENT_SCHEMA = object({
  paramDepartament,
  body: object({
    name: string(),
    description: string(),
  }).partial(),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type CreateDepartamentInput = TypeOf<typeof CREATE_DEPARTMENT_SCHEMA>;
export type ParamsInput = TypeOf<typeof paramDepartament>;
export type ParamInput = TypeOf<typeof paramCompany>;
export type UpdateDepartamentInput = TypeOf<
  typeof UPDATE_DEPARTMENT_SCHEMA
>["body"];
export type FilterQueryInput = TypeOf<typeof filterQuery>;
