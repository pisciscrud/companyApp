import { Employee } from "./employee";

export interface Department {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  employees?: Employee[];
}

export interface CreateDepartmentDTO {
  name: string;
  description: string;
}

export interface UpdateDepartamentDTO extends Partial<CreateDepartmentDTO> {}
