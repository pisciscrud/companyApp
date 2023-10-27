import { trpc } from "../utils/trpcClient";

export const getAllCompanies = async () => {
  const companies = await trpc.company.allCompanies.query();
  console.log(companies);
  return companies;
};

export const addNewCompany = async (input) => {
  console.log(input);
  await trpc.company.addCompany.mutate({
    name: input.name,
    description: input.description,
  });
};

export const deleteCompany = async (input: number) => {
   console.log('AAAA',input)
  await trpc.company.deleteCompany.mutate({
    companyId: input,
  });
};
