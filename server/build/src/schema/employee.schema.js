"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.UpdateEmployeeSchema = exports.paramName = exports.employeeParams = exports.CreateEmployeeSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.CreateEmployeeSchema = (0, zod_1.object)({
    firstName: (0, zod_1.string)({
        required_error: "Name is required",
    }),
    lastName: (0, zod_1.string)({
        required_error: "Last name is required",
    }),
    departmentId: (0, zod_1.number)({
        required_error: "Departament is required",
    }),
    position: zod_1.z.enum([client_1.Position.EMPLOYEE, client_1.Position.HEAD]),
});
exports.employeeParams = (0, zod_1.object)({
    idEmployee: (0, zod_1.number)(),
});
exports.paramName = (0, zod_1.object)({
    name: (0, zod_1.string)(),
});
exports.UpdateEmployeeSchema = (0, zod_1.object)({
    params: exports.employeeParams,
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)(),
        lastName: (0, zod_1.string)(),
        position: zod_1.z.enum([client_1.Position.EMPLOYEE, client_1.Position.HEAD]),
        departmentId: (0, zod_1.number)(),
    }).partial(),
});
exports.filterQuery = (0, zod_1.object)({
    limit: (0, zod_1.number)().default(1),
    page: (0, zod_1.number)().default(10),
});
