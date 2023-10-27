import { CompanyController } from "../controllers";
import {
  CreateCompanySchema,
  UpdateCompanySchema,
  companyParams,
} from "../schema/company.schema";
import { baseProcedure, router, adminProcedure } from "../trpc";

export const companyRouter = router({
  allCompanies: baseProcedure.query(CompanyController.getAll),
  addCompany: baseProcedure
    .input(CreateCompanySchema)
    .mutation(({ input, ctx }) => CompanyController.addCompany({ input, ctx })),
  updateCompany: adminProcedure
    .input(UpdateCompanySchema)
    .mutation(({ input }) =>
      CompanyController.updateCompany({
        paramsInput: input.params,
        input: input.body,
      })
    ),
  deleteCompany: baseProcedure
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
