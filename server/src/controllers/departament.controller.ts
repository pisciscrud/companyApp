import { TRPCError } from "@trpc/server";
import {
  CreateDepartamentInput,
  ParamsInput,
  UpdateDepartamentInput,
  ParamInput,
} from "../schema/departament.schema";

import { DepartamentService } from "../services/departament.service";

export class DepartamentController {
  static async getAll() {
    try {
      const result = await DepartamentService.getAllDepartaments();
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController getAll] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async getInfoAboutDepartament({
    paramsInput,
  }: {
    paramsInput: ParamsInput;
  }) {
    try {
      const result = await DepartamentService.getInfoAboutDepartament(
        paramsInput.idDepartament
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController getInfoAboutDepartament] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async getDepartamentsOfCompany({
    paramsInput,
  }: {
    paramsInput: ParamInput;
  }) {
    try {
      const result = await DepartamentService.getAllDepartamentsOfCompany(
        paramsInput.idCompany
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController getDepartamentsOfCompany] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async findFiveLargest({ paramsInput }: { paramsInput: ParamInput }) {
    try {
      const result =
        await DepartamentService.findFiveLargestDepartamentsOfCompany(
          paramsInput.idCompany
        );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController findFiveLargest] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async addDepartament({ input }: { input: CreateDepartamentInput }) {
    try {
      const result = await DepartamentService.createNewDepartament(input);
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
        message: `[DepartamentController addDepartament] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async updateDepartament({
    paramsInput,
    input,
  }: {
    paramsInput: ParamsInput;
    input: UpdateDepartamentInput;
  }) {
    try {
      const result = await DepartamentService.updateDepartament(
        paramsInput.idDepartament,
        input
      );
      return {
        ...result,
      };
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController updateDepartament] ${
          error?.message || error?.stack
        }`,
      });
    }
  }

  static async deleteDepartament({
    paramsInput,
  }: {
    paramsInput: ParamsInput;
  }) {
    try {
      await DepartamentService.deleteDepartament(paramsInput.idDepartament);
    } catch (error: any) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController deleteDepartament] ${
          error?.message || error?.stack
        }`,
      });
    }
  }
}
