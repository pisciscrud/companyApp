import { trpc } from "../utils/trpcClient";

export const addNewEmployee = async (input) => {
  console.log(input);
  await trpc.employee.addEmployee.mutate({
    firstName: input.firstName,
    lastName: input.lastName,
    departmentId: +input.departmentId,
    position: input.position,
  });
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
