import { DepartamentController } from "../controllers/departament.controller";
import { router, adminProcedure } from "../trpc";
import {
  CREATE_DEPARTMENT_SCHEMA,
  paramCompany,
  paramDepartament,
  UPDATE_DEPARTMENT_SCHEMA,
} from "../schema/departament.schema";

export const departamentRouter = router({
  allDepartaments: adminProcedure.query(DepartamentController.getAll),
  allDepartamentsOfCompany: adminProcedure
    .input(paramCompany)
    .query(({ input }) =>
      DepartamentController.getDepartamentsOfCompany({ paramsInput: input })
    ),
  addNewDeraptament: adminProcedure
    .input(CREATE_DEPARTMENT_SCHEMA)
    .mutation(({ input }) => DepartamentController.addDepartament({ input })),
  findLargestDepartaments: adminProcedure
    .input(paramCompany)
    .query(({ input }) =>
      DepartamentController.findFiveLargest({ paramsInput: input })
    ),
  deleteDepartament: adminProcedure
    .input(paramDepartament)
    .mutation(({ input }) =>
      DepartamentController.deleteDepartament({ paramsInput: input })
    ),
  updateDepartamnet: adminProcedure
    .input(UPDATE_DEPARTMENT_SCHEMA)
    .mutation(({ input }) =>
      DepartamentController.updateDepartament({
        paramsInput: input.paramDepartament,
        input: input.body,
      })
    ),
  findInfoAboutDepartament: adminProcedure
    .input(paramDepartament)
    .query(({ input }) =>
      DepartamentController.getInfoAboutDepartament({ paramsInput: input })
    ),
});
