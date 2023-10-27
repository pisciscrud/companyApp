import { trpc } from "../utils/trpcClient";

export const getFiveLargestDepartaments = async (idCompany: number) => {
  try {
    return await trpc.departament.findLargestDepartaments({
      idCompany: idCompany,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllDepartaments = async (idCompany: number) => {
  try {
    const departaments = await trpc.departament.allDepartamentsOfCompany.query({
      idCompany: +idCompany,
    });
    return departaments;
  } catch (e) {
    console.log(e);
  }
};

export const deleteDepartament = async (idDepartament: number) => {
  try {
    await trpc.departament.deleteDepartament.mutate({
      idDepartament: +idDepartament,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateDepartament = async (input) =>
{
  await trpc.company.updateDepartament.mutate({
    name:input.name,
    description:input.description
  })
}
