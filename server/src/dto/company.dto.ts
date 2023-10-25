export interface CreateCompanyDTO {
  name: string;
  description: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  description?: string;
}
