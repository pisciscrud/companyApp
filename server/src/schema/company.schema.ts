import { number, object, string, TypeOf } from "zod";

export const CreateCompanySchema = object({
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

export const UpdateCompanySchema = object({
  params: companyParams,
  body: object({
    name: string(),
    description: string(),
  }).partial(),
});



export type CreateCompanyInput = TypeOf<typeof CreateCompanySchema>;
export type ParamsInputCompany = TypeOf<typeof companyParams>;
export type UpdateCompanyInput = TypeOf<typeof UpdateCompanySchema>["body"];
