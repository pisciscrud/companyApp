import { Position } from "@prisma/client";

export interface CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  departmentId: number;
  position: Position;
}

export interface UpdateEmployeeDTO {
  firstName?: string;
  lastName?: string;
  departmentId?: number;
  position?: Position;
}
