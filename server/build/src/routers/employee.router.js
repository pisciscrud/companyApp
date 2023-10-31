"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const employee_controller_1 = require("../controllers/employee.controller");
const employee_schema_1 = require("../schema/employee.schema");
const trpc_1 = require("../trpc");
const company_schema_1 = require("../schema/company.schema");
exports.employeeRouter = (0, trpc_1.router)({
    allEmployees: trpc_1.adminProcedure.query(employee_controller_1.EmployeeController.getAll),
    addEmployee: trpc_1.adminProcedure
        .input(employee_schema_1.CreateEmployeeSchema)
        .mutation(({ input }) => employee_controller_1.EmployeeController.addNewEmployee({ input })),
    updateEmployee: trpc_1.adminProcedure
        .input(employee_schema_1.UpdateEmployeeSchema)
        .mutation(({ input }) => employee_controller_1.EmployeeController.updateEmployee({
        paramsInput: input.params,
        input: input.body,
    })),
    deleteEmployee: trpc_1.adminProcedure
        .input(employee_schema_1.employeeParams)
        .mutation(({ input }) => employee_controller_1.EmployeeController.deleteEmployee({ paramsInput: input })),
    emplyeesByName: trpc_1.adminProcedure
        .input(employee_schema_1.paramName)
        .query(({ input }) => employee_controller_1.EmployeeController.findEmployeesByName({ paramInput: input })),
    findInfoAboutEmployee: trpc_1.adminProcedure
        .input(employee_schema_1.employeeParams)
        .query(({ input }) => employee_controller_1.EmployeeController.findInfoAboutEmployee({ paramsInput: input })),
    getEmployeesOfCompany: trpc_1.adminProcedure
        .input(company_schema_1.companyParams)
        .query(({ input }) => employee_controller_1.EmployeeController.getEmployeesOfCompany({ paramsInput: input })),
    getFiveNewestEmployeesOfCompany: trpc_1.adminProcedure
        .input(company_schema_1.companyParams)
        .query(({ input }) => employee_controller_1.EmployeeController.getFiveEmployeesOfCompany({ paramsInput: input })),
});
