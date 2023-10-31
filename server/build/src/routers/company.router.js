"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRouter = void 0;
const controllers_1 = require("../controllers");
const company_schema_1 = require("../schema/company.schema");
const trpc_1 = require("../trpc");
exports.companyRouter = (0, trpc_1.router)({
    allCompanies: trpc_1.adminProcedure.query(controllers_1.CompanyController.getAll),
    addCompany: trpc_1.adminProcedure
        .input(company_schema_1.CreateCompanySchema)
        .mutation(({ input }) => controllers_1.CompanyController.addCompany({ input })),
    updateCompany: trpc_1.adminProcedure
        .input(company_schema_1.UpdateCompanySchema)
        .mutation(({ input }) => controllers_1.CompanyController.updateCompany({
        paramsInput: input.params,
        input: input.body,
    })),
    deleteCompany: trpc_1.adminProcedure
        .input(company_schema_1.companyParams)
        .mutation(({ input }) => controllers_1.CompanyController.deleteCompany({ paramsInput: input })),
    findInfoAboutCompany: trpc_1.adminProcedure
        .input(company_schema_1.companyParams)
        .query(({ input }) => controllers_1.CompanyController.findInfoAboutCompany({ paramsInput: input })),
});
