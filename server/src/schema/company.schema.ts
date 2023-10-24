import { boolean, number, object, string, TypeOf } from 'zod';

export const CreateCompanySchema = object({
  name: string({
    required_error: 'Name is required',
  }),
  description: string({
    required_error: 'Descriprion is required',
  }),
});

export const params = object({
    companyId: number(),
}
)
export const UpdateCompanySchema = object(
    {
    params,
     body: object({
        name: string(),
        description: string()
     }).partial()
   
    }
)

export type CreateCompanyInput = TypeOf<typeof CreateCompanySchema>;
export type ParamsInput = TypeOf<typeof params>;
export type UpdateCompanyInput = TypeOf<typeof UpdateCompanySchema>['body']