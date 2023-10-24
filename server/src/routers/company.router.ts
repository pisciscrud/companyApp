import { z } from 'zod';
import { CompanyController } from '../controllers/company.controller';
import { CreateCompanySchema, UpdateCompanySchema, params } from '../schema/company.schema';
import { baseProcedure, router } from '../trpc';

export const companyRouter = router ({
    allCompanies: baseProcedure.query(CompanyController.getAll),
    addCompany: baseProcedure.input(CreateCompanySchema).mutation(({input, ctx})=>CompanyController.addCompany({input,ctx})),
    updateCompany: baseProcedure.input(UpdateCompanySchema).mutation(({input})=>CompanyController.updateCompany({ paramsInput: input.params, input: input.body })),
    deleteCompany: baseProcedure.input(params).mutation(({input})=>CompanyController.deleteCompany({paramsInput: input})),
})