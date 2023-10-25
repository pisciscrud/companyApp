import { TRPCError } from "@trpc/server";
import { EmployeeService } from "../services/employess.service";
import {
  CreateEmployeeInput,
  ParamInputName,
  ParamsInput,
  UpdateEmployeeInput,
} from "../schema/employee.schema";

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
        paramsInput.idEmployee,
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
      await EmployeeService.deleteEmployee(paramsInput.idEmployee);
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
      const result = await EmployeeService.getEmployessByName(paramInput.name);
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
        paramsInput.idEmployee
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
        message: `[EmployeeController findInfoAboutEmployee] ${
          error?.message || error?.stack
        }`,
      });
    }
  }
}
