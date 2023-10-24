import { TRPCError } from "@trpc/server";
import { CompanyService } from "../services/сompany.service";
import {
  CreateCompanyInput,
  ParamsInput,
  UpdateCompanyInput,
} from "../schema/company.schema";

export class CompanyController {
  static async getAll({ ctx }: { ctx: any }) {
    try {
      const result = await CompanyService.getAllCompanies();
      console.log(result);
      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (e: any) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController getAll] ${e?.message || e?.stack}`,
      });
    }
  }

  static async addCompany({
    input,
    ctx,
  }: {
    input: CreateCompanyInput;
    ctx: any;
  }) {
    try {
      const result = await CompanyService.addNewCompany(input);
      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (error: any) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController addCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async updateCompany({
    paramsInput,
    input,
  }: {
    paramsInput: ParamsInput;
    input: UpdateCompanyInput;
  }) {
    try {
      const result = await CompanyService.updateCompany(
        paramsInput.companyId,
        input
      );
      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (error: any) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController updateCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async deleteCompany({ paramsInput }: { paramsInput: ParamsInput }) {
    try {
      await CompanyService.deleteCompany(paramsInput.companyId);
      return {
        status: "success",
        data: null,
      };
    } catch (error: any) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController deleteCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }
}