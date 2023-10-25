export interface CreateDepartamentDTO {
  name: string;
  description: string;
  companyId: number;
}

export interface UpdateDepartamentDTO {
  name?: string;
  description?: string;
}
