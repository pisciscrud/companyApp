import { CompanyController } from "../controllers";
import {
  CreateCompanySchema,
  UpdateCompanySchema,
  companyParams,
} from "../schema/company.schema";
import { baseProcedure, router, adminProcedure } from "../trpc";

export const companyRouter = router({
  allCompanies: adminProcedure.query(CompanyController.getAll),
  addCompany: adminProcedure
    .input(CreateCompanySchema)
    .mutation(({ input, ctx }) => CompanyController.addCompany({ input })),
  updateCompany: adminProcedure
    .input(UpdateCompanySchema)
    .mutation(({ input }) =>
      CompanyController.updateCompany({
        paramsInput: input.params,
        input: input.body,
      })
    ),
  deleteCompany: adminProcedure
    .input(companyParams)
    .mutation(({ input }) =>
      CompanyController.deleteCompany({ paramsInput: input })
    ),
  findInfoAboutCompany: adminProcedure
    .input(companyParams)
    .query(({ input }) =>
      CompanyController.findInfoAboutCompany({ paramsInput: input })
    ),
});
