import { Department } from "./department";

export enum Position {
  HEAD = "HEAD",
  EMPLOYEE = "EMPLOYEE",
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: "HEAD" | "EMPLOYEE";
  departmentId: number;
  createdAt: number | string;
  updatedAt: number | string;
  department?: Department;
}

export interface CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  position: Position;
  departmentId: number;
}

export interface UpdateEmployeeDTO extends Partial<CreateEmployeeDTO> {}
