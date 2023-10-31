import { trpc } from "../utils/trpcClient";
import { CreateCompanyDTO } from "../shared/interfaces/company";

export const getAllCompanies = async () => {
  const companies = await trpc.company.allCompanies.query();
  return companies;
};

export const addNewCompany = async (input: CreateCompanyDTO) => {
  await trpc.company.addCompany.mutate({
    name: input.name,
    description: input.description,
  });
};

export const deleteCompany = async (input: number) => {
  await trpc.company.deleteCompany.mutate({
    companyId: input,
  });
};
