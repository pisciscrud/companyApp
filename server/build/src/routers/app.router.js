"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const company_router_1 = require("./company.router");
const departament_router_1 = require("./departament.router");
const employee_router_1 = require("./employee.router");
const auth_router_1 = require("./auth.router");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    company: company_router_1.companyRouter,
    departament: departament_router_1.departamentRouter,
    employee: employee_router_1.employeeRouter,
});
