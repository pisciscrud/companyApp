import { trpc } from "../utils/trpcClient";
import {
  CreateDepartmentDTO,
  Department,
  UpdateDepartamentDTO,
} from "../shared/interfaces/department";

export const getFiveLargestDepartaments = async (
  idCompany: number
): Promise<Department[]> => {
  try {
    const {
      data: { result },
    } = await trpc.departament.findLargestDepartaments.query({
      idCompany: +idCompany,
    });
    return result;
  } catch (e) {
    return new Array<Department>();
  }
};

export const getAllDepartaments = async (
  idCompany: number
): Promise<Department[]> => {
  try {
    const { data } = await trpc.departament.allDepartamentsOfCompany.query({
      idCompany: +idCompany,
    });
    return data.result;
  } catch (e) {
    return new Array<Department>();
  }
};

export const getInfoAboutDepartment = async (idDepartment: number) => {
  return await trpc.departament.findInfoAboutDepartament.query({
    idDepartament: +idDepartment,
  });
};

export const deleteDepartament = async (idDepartament: number) => {
  await trpc.departament.deleteDepartament.mutate({
    idDepartament: +idDepartament,
  });
};

export const updateDepartament = async (
  id: number,
  input: UpdateDepartamentDTO
) => {
  await trpc.departament.updateDepartamnet.mutate({
    paramDepartament: {
      idDepartament: +id,
    },
    body: {
      name: input.name,
      description: input.description,
    },
  });
};

export const addNewDepartment = async (
  id: number,
  input: CreateDepartmentDTO
) => {
  await trpc.departament.addNewDeraptament.mutate({
    name: input.name,
    description: input.description,
    companyId: +id,
  });
};
