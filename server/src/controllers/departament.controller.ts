import { TRPCError } from "@trpc/server";
import {
  CreateDepartamentInput,
  ParamsInput,
  UpdateDepartamentInput,
  ParamInput
} from "../schema/departament.schema";

import { DepartamentService } from "../services/departament.service";

export class DepartamentController {
  static async getAll() {
    try {
      const result = await DepartamentService.getAllDepartaments();
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
        message: `[DepartamentController getAll] ${e?.message || e?.stack}`,
      });
    }
  }

  static async getInfoAboutDepartament({ paramsInput }: { paramsInput: ParamsInput})
  {

  }

  static async getDepartamentsOfCompany({ paramsInput }: { paramsInput: ParamInput})
  {
    try 
    {
      const result = await DepartamentService.getAllDepartamentsOfCompany(paramsInput )
      return {
        status: "success",
        data: {
          result,
        },
      };
    }
    catch (e: any) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController getDepartamentsOfCompany] ${e?.message || e?.stack}`,
      });
    }
  }

  static async findFiveLargest({ paramsInput }: { paramsInput: ParamInput }) {
    try {
      const result =
        await DepartamentService.findFiveLargestDepartamentsOfCompany({
          id: paramsInput
        });
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
        message: `[DepartamentController findFiveLargest] ${
          e?.message || e?.stack
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
    } catch (e: any) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController addDepartament] ${
          e?.message || e?.stack
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
        paramsInput,
        input
      );
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
        message: `[DepartamentController updateDepartament] ${
          e?.message || e?.stack
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
      await DepartamentService.deleteDepartament({
        id: paramsInput.idDepartament,
      });
    } catch (e: any) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `[DepartamentController deleteDepartament] ${
          e?.message || e?.stack
        }`,
      });
    }
  }
}
