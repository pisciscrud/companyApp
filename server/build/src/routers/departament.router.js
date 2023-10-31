"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departamentRouter = void 0;
const departament_controller_1 = require("../controllers/departament.controller");
const trpc_1 = require("../trpc");
const departament_schema_1 = require("../schema/departament.schema");
exports.departamentRouter = (0, trpc_1.router)({
    allDepartaments: trpc_1.adminProcedure.query(departament_controller_1.DepartamentController.getAll),
    allDepartamentsOfCompany: trpc_1.adminProcedure
        .input(departament_schema_1.paramCompany)
        .query(({ input }) => departament_controller_1.DepartamentController.getDepartamentsOfCompany({ paramsInput: input })),
    addNewDeraptament: trpc_1.adminProcedure
        .input(departament_schema_1.CreateDepartamentSchema)
        .mutation(({ input }) => departament_controller_1.DepartamentController.addDepartament({ input })),
    findLargestDepartaments: trpc_1.adminProcedure
        .input(departament_schema_1.paramCompany)
        .query(({ input }) => departament_controller_1.DepartamentController.findFiveLargest({ paramsInput: input })),
    deleteDepartament: trpc_1.adminProcedure
        .input(departament_schema_1.paramDepartament)
        .mutation(({ input }) => departament_controller_1.DepartamentController.deleteDepartament({ paramsInput: input })),
    updateDepartamnet: trpc_1.adminProcedure
        .input(departament_schema_1.UpdateDepartamentSchema)
        .mutation(({ input }) => departament_controller_1.DepartamentController.updateDepartament({
        paramsInput: input.paramDepartament,
        input: input.body,
    })),
    findInfoAboutDepartament: trpc_1.adminProcedure
        .input(departament_schema_1.paramDepartament)
        .query(({ input }) => departament_controller_1.DepartamentController.getInfoAboutDepartament({ paramsInput: input })),
});
