import { EmployeeController } from '../controllers/employee.controller';
import { CreateEmployeeSchema, UpdateEmployeeSchema,params, paramName } from '../schema/employee.schema';
import { baseProcedure, router } from '../trpc';

export const employeeRouter = router(
{
    allEmployees: baseProcedure.query(EmployeeController.getAll),
    addEmployee: baseProcedure.input(CreateEmployeeSchema).mutation(({input})=>EmployeeController.addNewEmployee({input})),
    updateEmployee: baseProcedure.input(UpdateEmployeeSchema).mutation(({input})=>EmployeeController.updateEmployee({paramsInput:input.params,input:input.body})),
    deleteEmployee: baseProcedure.input(params).mutation(({input})=>EmployeeController.deleteEmployee({paramsInput: input})),
    emplyeesByName: baseProcedure.input(paramName).mutation(({input})=>EmployeeController.findEmployeesByName({paramInput:input}))

})