import { CompanyController } from "../controllers";
import {
  CREATE_COMPANY_SCHEMA,
  UPDATE_COMPANY_SCHEMA,
  companyParams,
} from "../schema/company.schema";
import { router, adminProcedure } from "../trpc";

export const companyRouter = router({
  allCompanies: adminProcedure.query(CompanyController.getAll),
  addCompany: adminProcedure
    .input(CREATE_COMPANY_SCHEMA)
    .mutation(({ input }) => CompanyController.addCompany({ input })),
  updateCompany: adminProcedure
    .input(UPDATE_COMPANY_SCHEMA)
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
