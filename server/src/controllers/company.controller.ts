import { TRPCError } from "@trpc/server";
import { CompanyService } from "../services/сompany.service";
import {
  CreateCompanyInput,
  ParamsInputCompany,
  UpdateCompanyInput,
} from "../schema/company.schema";

export class CompanyController {
  static async getAll() {
    try {
      const result = await CompanyService.getAllCompanies();
      return result;
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController getAll] ${error?.message || error?.stack}`,
      });
    }
  }

  static async addCompany({ input }: { input: CreateCompanyInput }) {
    try {
      const result = await CompanyService.addNewCompany(input);
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
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
    paramsInput: ParamsInputCompany;
    input: UpdateCompanyInput;
  }) {
    try {
      const result = await CompanyService.updateCompany(
        paramsInput.companyId,
        input
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController updateCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async deleteCompany({
    paramsInput,
  }: {
    paramsInput: ParamsInputCompany;
  }) {
    try {
      await CompanyService.deleteCompany(paramsInput.companyId);
      return {
        status: "success",
        data: null,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController deleteCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async findInfoAboutCompany({
    paramsInput,
  }: {
    paramsInput: ParamsInputCompany;
  }) {
    try {
      const result = await CompanyService.getInfoAboutCompany(
        paramsInput.companyId
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[CompanyController deleteCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }
}
