import { Department } from "./department";

export enum Position {
  HEAD = "HEAD",
  EMPLOYEE = "EMPLOYEE",
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: Position.HEAD | Position.EMPLOYEE;
  departmentId: number;
  createdAt: number | string;
  updatedAt: number | string;
  department: Department;
}
