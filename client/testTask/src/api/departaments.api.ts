import { trpc } from "../utils/trpcClient";
import {
  deleteDepartamentInput,
  DepartmentCreateInput,
  GetAllDepartaments,
  GetDepartmnetOutput,
  GetDepartmnetsOutput,
  GetFiveLargestDepartamentsOutput,
  GetFiveLargestDepartmentInput,
  GetInfoAboutDepartment,
  UpdateDepartammentInput,
} from "./types";

export const getFiveLargestDepartaments = async (
  idCompany: GetFiveLargestDepartmentInput
): Promise<GetFiveLargestDepartamentsOutput> => {
  try {
    const departaments = await trpc.departament.findLargestDepartaments.query({
      ...idCompany,
    });
    return Object.entries(departaments).map(([key, value]) => value);
  } catch (e) {
    return new Array();
  }
};

export const getAllDepartaments = async (
  idCompany: GetAllDepartaments
): Promise<GetDepartmnetsOutput> => {
  try {
    const data = await trpc.departament.allDepartamentsOfCompany.query({
      ...idCompany,
    });
    return Object.entries(data).map(([key, value]) => value);
  } catch (e) {
    return new Array();
  }
};

export const getInfoAboutDepartment = async (
  idDepartment: GetInfoAboutDepartment
): Promise<GetDepartmnetOutput> => {
  return await trpc.departament.findInfoAboutDepartament.query({
    ...idDepartment,
  });
};

export const deleteDepartament = async (
  idDepartament: deleteDepartamentInput
) => {
  await trpc.departament.deleteDepartament.mutate({
    ...idDepartament,
  });
};

export const updateDepartament = async (input: UpdateDepartammentInput) => {
  await trpc.departament.updateDepartamnet.mutate({
    ...input,
  });
};

export const addNewDepartment = async (input: DepartmentCreateInput) => {
  await trpc.departament.addNewDeraptament.mutate({
    ...input,
  });
};
