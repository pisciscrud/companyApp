import { EmployeeController } from "../controllers/employee.controller";
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  employeeParams,
  paramName,
} from "../schema/employee.schema";
import { baseProcedure, router, adminProcedure } from "../trpc";

export const employeeRouter = router({
  allEmployees: adminProcedure.query(EmployeeController.getAll),
  addEmployee: adminProcedure
    .input(CreateEmployeeSchema)
    .mutation(({ input }) => EmployeeController.addNewEmployee({ input })),
  updateEmployee: adminProcedure
    .input(UpdateEmployeeSchema)
    .mutation(({ input }) =>
      EmployeeController.updateEmployee({
        paramsInput: input.params,
        input: input.body,
      })
    ),
  deleteEmployee: adminProcedure
    .input(employeeParams)
    .mutation(({ input }) =>
      EmployeeController.deleteEmployee({ paramsInput: input })
    ),
  emplyeesByName: adminProcedure
    .input(paramName)
    .query(({ input }) =>
      EmployeeController.findEmployeesByName({ paramInput: input })
    ),
  findInfoAboutEmployee: adminProcedure
    .input(employeeParams)
    .query(({ input }) =>
      EmployeeController.findInfoAboutEmployee({ paramsInput: input })
    ),
});
