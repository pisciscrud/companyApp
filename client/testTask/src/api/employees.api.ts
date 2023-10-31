import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "../shared/interfaces/employee";
import { trpc } from "../utils/trpcClient";

export const addNewEmployee = async (input: CreateEmployeeDTO) => {
  try {
    const res = await trpc.employee.addEmployee.mutate({
      firstName: input.firstName,
      lastName: input.lastName,
      departmentId: input.departmentId,
      position: input.position,
    });
    return res;
  } catch (error: any) {
    throw new Error(`Failed to add new employee: ${error.message}`);
  }
};

export const addNewEmployeeToDepartment = async (input: CreateEmployeeDTO) => {
  try {
    const res = await trpc.employee.addEmployee.mutate({
      firstName: input.firstName,
      lastName: input.lastName,
      departmentId: input.departmentId,
      position: input.position,
    });
    return res;
  } catch (error: any) {
    throw new Error(`Failed to add new employee: ${error.message}`);
  }
};
export const getAllEmployeesOfCompany = async (input: number) => {
  return await trpc.employee.getEmployeesOfCompany.query({ companyId: +input });
};

export const getEmployeesByName = async (input: string) => {
  return await trpc.employee.emplyeesByName.query({ name: input });
};

export const deleteEmployee = async (input: number) => {
  return await trpc.employee.deleteEmployee.mutate({ idEmployee: input });
};

export const updateEmployee = async (id: number, input: UpdateEmployeeDTO) => {
  await trpc.employee.updateEmployee.mutate({
    params: {
      idEmployee: +id,
    },
    body: {
      firstName: input.firstName,
      lastName: input.lastName,
      ...(input?.departmentId && { departmentId: input.departmentId }),
      position: input.position,
    },
  });
};

export const getFiveNewestEmployeesOfCompany = async (input: number) => {
  return await trpc.employee.getFiveNewestEmployeesOfCompany.query({
    companyId: +input,
  });
};

export const getInfoAboutEmployee = async (input: number) => {
  return await trpc.employee.findInfoAboutEmployee.query({ idEmployee: input });
};
