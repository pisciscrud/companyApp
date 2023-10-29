import { Employee } from "./employee";

export interface Department {
  id: number;
  name: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  companyId: number;
  employees: Employee[];
}
