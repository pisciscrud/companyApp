import { number, object, string, TypeOf } from "zod";

export const CREATE_COMPANY_SCHEMA = object({
  name: string({
    required_error: "Name is required",
  }),
  description: string({
    required_error: "Descriprion is required",
  }),
});

export const companyParams = object({
  companyId: number(),
});

export const UPDATE_COMPANY_SCHEMA = object({
  params: companyParams,
  body: object({
    name: string(),
    description: string(),
  }).partial(),
});

export type CreateCompanyInput = TypeOf<typeof CREATE_COMPANY_SCHEMA>;
export type ParamsInputCompany = TypeOf<typeof companyParams>;
export type UpdateCompanyInput = TypeOf<typeof UPDATE_COMPANY_SCHEMA>["body"];
