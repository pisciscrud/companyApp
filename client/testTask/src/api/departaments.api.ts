import { trpc } from "../utils/trpcClient";

export const getFiveLargestDepartaments = async (idCompany: number) => {
  try {
    return await trpc.departament.findLargestDepartaments.query({
      idCompany: +idCompany,
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

export const getInfoAboutDepartment = async (idDepartment : number) => {
  return await trpc.departament.findInfoAboutDepartament.query({
    idDepartament: +idDepartment,
  });
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

export const updateDepartament = async (id:number, input) => {
  await trpc.departament.updateDepartamnet.mutate({
    paramDepartament: {
      idDepartament: +id,
    },
    body: {
      name: input.name,
      description: input.description,
    },
  });
};

export const addNewDepartment = async (id:number, input ) => {
  await trpc.departament.addNewDeraptament.mutate({
    name: input.name,
    description: input.description,
    companyId: +id,
  });
};
