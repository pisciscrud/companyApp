import { trpc } from "../utils/trpcClient";
import { CompaniesOutput, CompanyCreateOptions, CompanyDeleteOptions } from "./types";

export const getAllCompanies = async (): Promise<CompaniesOutput> => {
  const companies = await trpc.company.allCompanies.query();
  return Object.entries(companies).map(([_key, value]) => value);
};

export const addNewCompany = async (input: CompanyCreateOptions) => {
  await trpc.company.addCompany.mutate({ ...input });
};

export const deleteCompany = async (input: CompanyDeleteOptions) => {
  await trpc.company.deleteCompany.mutate({
    ...input,
  });
};
