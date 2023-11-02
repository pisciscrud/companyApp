import { trpc } from "../utils/trpcClient";
import {
  CreateEmployeeInput,
  DeleteEmployeeInput,
  GetAllEmployeesCompanyOutput,
  GetAllEmployeesOfCompanyInput,
  GetEmployeeByNameInput,
  GetEmployeesByNameOutput,
  GetFiveNewestEmployeesOfCompanyInput,
  GetFiveNewestEmployeesOfCompanyOutput,
  GetInfoAboutEmployeeInput,
  GetInfoAboutEmployeeOutput,
  UpdateEmployeeInput,
} from "./types";

export const addNewEmployee = async (input: CreateEmployeeInput) => {
  try {
    const res = await trpc.employee.addEmployee.mutate({
      ...input,
    });
    return res;
  } catch (error: any) {
    throw new Error(`Failed to add new employee: ${error.message}`);
  }
};

export const addNewEmployeeToDepartment = async (
  input: CreateEmployeeInput
) => {
  try {
    const res = await trpc.employee.addEmployee.mutate({
      ...input,
    });
    return res;
  } catch (error: any) {
    throw new Error(`Failed to add new employee: ${error.message}`);
  }
};
export const getAllEmployeesOfCompany = async (
  input: GetAllEmployeesOfCompanyInput
): Promise<GetAllEmployeesCompanyOutput> => {
  const employees = await trpc.employee.getEmployeesOfCompany.query({
    ...input,
  });
  return Object.entries(employees).map(([key, value]) => value);
};

export const getEmployeesByName = async (
  input: GetEmployeeByNameInput
): Promise<GetEmployeesByNameOutput> => {
  const employees = await trpc.employee.emplyeesByName.query({ ...input });
  return Object.entries(employees).map(([key, value]) => value);
};

export const deleteEmployee = async (input: DeleteEmployeeInput) => {
  return await trpc.employee.deleteEmployee.mutate({ ...input });
};

export const updateEmployee = async (input: UpdateEmployeeInput) => {
  await trpc.employee.updateEmployee.mutate({
    ...input,
  });
};

export const getFiveNewestEmployeesOfCompany = async (
  input: GetFiveNewestEmployeesOfCompanyInput
): Promise<GetFiveNewestEmployeesOfCompanyOutput> => {
  const employees = await trpc.employee.getFiveNewestEmployeesOfCompany.query({
    ...input,
  });
  return Object.entries(employees).map(([key, value]) => value);
};

export const getInfoAboutEmployee = async (
  input: GetInfoAboutEmployeeInput
): Promise<GetInfoAboutEmployeeOutput> => {
  return await trpc.employee.findInfoAboutEmployee.query({ ...input });
};
