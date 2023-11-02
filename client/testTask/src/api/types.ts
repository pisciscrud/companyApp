import { RouterInputs, RouterOutputs } from "../utils/trpcClient";

export type CreateEmployeeInput = RouterInputs["employee"]["addEmployee"];
export type UpdateEmployeeInput = RouterInputs["employee"]["updateEmployee"];
export type GetEmployeeByNameInput = RouterInputs["employee"]["emplyeesByName"];
export type DeleteEmployeeInput = RouterInputs["employee"]["deleteEmployee"];
export type GetFiveNewestEmployeesOfCompanyInput =
  RouterInputs["employee"]["getFiveNewestEmployeesOfCompany"];
export type GetAllEmployeesOfCompanyInput =
  RouterInputs["employee"]["getEmployeesOfCompany"];

export type GetInfoAboutEmployeeInput =
  RouterInputs["employee"]["findInfoAboutEmployee"];

export type GetAllEmployeesCompanyOutput =
  RouterOutputs["employee"]["getEmployeesOfCompany"];

export type GetEmployeesByNameOutput =
  RouterOutputs["employee"]["emplyeesByName"];

export type GetFiveNewestEmployeesOfCompanyOutput =
  RouterOutputs["employee"]["getFiveNewestEmployeesOfCompany"];

export type GetInfoAboutEmployeeOutput =
  RouterOutputs["employee"]["findInfoAboutEmployee"];

export type CompanyCreateOptions = RouterInputs["company"]["addCompany"];
export type CompanyDeleteOptions = RouterInputs["company"]["deleteCompany"];
export type CompaniesOutput = RouterOutputs["company"]["allCompanies"];
export type CompanyOutput = RouterOutputs["company"]["findInfoAboutCompany"];

export type DepartmentCreateInput =
  RouterInputs["departament"]["addNewDeraptament"];
export type UpdateDepartammentInput =
  RouterInputs["departament"]["updateDepartamnet"];

export type GetFiveLargestDepartmentInput =
  RouterInputs["departament"]["findLargestDepartaments"];
export type GetInfoAboutDepartment =
  RouterInputs["departament"]["findInfoAboutDepartament"];
export type GetAllDepartaments =
  RouterInputs["departament"]["allDepartamentsOfCompany"];
export type deleteDepartamentInput =
  RouterInputs["departament"]["deleteDepartament"];
export type GetDepartmnetsOutput =
  RouterOutputs["departament"]["allDepartamentsOfCompany"];
export type GetDepartmnetOutput =
  RouterOutputs["departament"]["findInfoAboutDepartament"];
export type GetFiveLargestDepartamentsOutput =
  RouterOutputs["departament"]["findLargestDepartaments"];

export enum Position {
  HEAD = "HEAD",
  EMPLOYEE = "EMPLOYEE",
}
