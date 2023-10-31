export interface Company {
  name: string;
  description: string;
  createdAt: string;
  id: number;
}

export interface CreateCompanyDTO {
  name: string;
  description: string;
}
