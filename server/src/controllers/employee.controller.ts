import { TRPCError } from "@trpc/server";
import { EmployeeService } from "../services/employess.service";
import {
  CreateEmployeeInput,
  ParamInputName,
  ParamsInput,
  UpdateEmployeeInput,
} from "../schema/employee.schema";
import { ParamsInputCompany } from "../schema/company.schema";

export class EmployeeController {
  static async getAll() {
    try {
      const result = await EmployeeService.getAll();
      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController getAll] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async addNewEmployee({ input }: { input: CreateEmployeeInput }) {
    try {
      const result = await EmployeeService.createEmployee(input);

      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController addNewEmployee] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async updateEmployee({
    paramsInput,
    input,
  }: {
    paramsInput: ParamsInput;
    input: UpdateEmployeeInput;
  }) {
    try {
      const result = await EmployeeService.updateEmployee(
        paramsInput.employeeId,
        input
      );
      return {
        status: "success",
        data: {
          result,
        },
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController updateEmployee] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async deleteEmployee({ paramsInput }: { paramsInput: ParamsInput }) {
    try {
      await EmployeeService.deleteEmployee(paramsInput.employeeId);
      return {
        status: "success",
        data: null,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController deleteEmployee] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async findEmployeesByName({
    paramInput,
  }: {
    paramInput: ParamInputName;
  }) {
    try {
      const result = await EmployeeService.getEmployessByName(
        paramInput.name,
        paramInput.companyId
      );
      return result;
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController findEmployeesByName] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async findInfoAboutEmployee({
    paramsInput,
  }: {
    paramsInput: ParamsInput;
  }) {
    try {
      const result = await EmployeeService.getInfoAboutEmployee(
        paramsInput.employeeId
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController findInfoAboutEmployee] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async getEmployeesOfCompany({
    paramsInput,
  }: {
    paramsInput: ParamsInputCompany;
  }) {
    try {
      const result = await EmployeeService.getEmployeesOfCompany(
        paramsInput.companyId
      );
      return result;
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController getEmployeesOfCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async getFiveEmployeesOfCompany({
    paramsInput,
  }: {
    paramsInput: ParamsInputCompany;
  }) {
    try {
      const result = await EmployeeService.getFiveNewestEmployeesOfCompany(
        paramsInput.companyId
      );
      return result;
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[EmployeeController getEmployeesOfCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }
}
