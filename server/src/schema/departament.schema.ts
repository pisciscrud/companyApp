import { boolean, number, object, string, TypeOf } from 'zod';

export const CreateDepartamentSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
  companyId: number({
    required_error: 'Company is required',
  }),
  description: string({
    required_error: 'Descriprion is required',
  }),
});

export const paramDepartament = object({
  idDepartament: number(),
})

export const paramCompany = object(
  {
    idCompany:number()
  }
)

export const UpdateDepartamentSchema = object({
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

export type CreateDepartamentInput = TypeOf<typeof CreateDepartamentSchema>;
export type ParamsInput = TypeOf<typeof paramDepartament>;
export type ParamInput = TypeOf<typeof paramCompany>;
export type UpdateDepartamentInput = TypeOf<typeof UpdateDepartamentSchema>['body'];
export type FilterQueryInput = TypeOf<typeof filterQuery>;
