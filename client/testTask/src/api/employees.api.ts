import { trpc } from "../utils/trpcClient";
import { CreateEmployeeInput, UpdateEmployeeInput } from "../../../../server/src/schema/employee.schema";

export const addNewEmployee = async (input) => {
  try {
    const res = await trpc.employee.addEmployee.mutate({
      firstName: input.firstName,
      lastName: input.lastName,
      departmentId: +input.department,
      position: input.position,
    });
    return res;
  } catch (error:any) {
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


export const updateEmployee = async (id:number,input) =>
{
  await trpc.employee.updateEmployee.mutate({
    params:
    {
      idEmployee: +id
    },
    body:
    {
      firstName: input.firstName,
      lastName: input.lastName,
      departmentId: +input.department,
      position: input.position,

    }
  })
}

export const getFiveNewestEmployeesOfCompany = async (input: number) =>
{

  return await trpc.employee.getFiveNewestEmployeesOfCompany.query({ companyId: +input });
}

export const getInfoAboutEmployee = async ( input: number) =>
{
  console.log('input',input);
  return await trpc.employee.findInfoAboutEmployee.query({ idEmployee : input});
}