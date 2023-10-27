import { DepartamentController } from "../controllers/departament.controller";
import { baseProcedure, router } from "../trpc";
import {
  CreateDepartamentSchema,
  paramCompany,
  paramDepartament,
  UpdateDepartamentSchema,
  ParamsInput,
} from "../schema/departament.schema";

export const departamentRouter = router({
  allDepartaments: baseProcedure.query(DepartamentController.getAll),
  allDepartamentsOfCompany: baseProcedure
    .input(paramCompany)
    .query(({ input }) =>
      DepartamentController.getDepartamentsOfCompany({ paramsInput: input })
    ),
  addNewDeraptament: baseProcedure
    .input(CreateDepartamentSchema)
    .mutation(({ input }) => DepartamentController.addDepartament({ input })),
  findLargestDepartaments: baseProcedure
    .input(paramCompany)
    .query(({ input }) =>
      DepartamentController.findFiveLargest({ paramsInput: input })
    ),
  deleteDepartament: baseProcedure
    .input(paramDepartament)
    .mutation(({ input }) =>
      DepartamentController.deleteDepartament({ paramsInput: input })
    ),
  updateDepartamnet: baseProcedure
    .input(UpdateDepartamentSchema)
    .mutation(({ input }) =>
      DepartamentController.updateDepartament({
        paramsInput: input.paramDepartament,
        input: input.body,
      })
    ),
  findInfoAboutDepartament: baseProcedure
    .input(paramDepartament)
    .query(({ input }) =>
      DepartamentController.getInfoAboutDepartament({ paramsInput: input })
    ),
});
