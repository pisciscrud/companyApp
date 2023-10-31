"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const server_1 = require("@trpc/server");
const prisma_1 = require("../prisma");
const client_1 = require("@prisma/client");
class EmployeeService {
    static getAllEmployeesOfDepartament(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield prisma_1.prisma.department.findUnique({
                where: { id: id },
            });
            if (!department)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService getAllEmployeesOfDepartament] Department ID provided has not exists`,
                });
            return yield prisma_1.prisma.employee.findMany({
                where: {
                    departmentId: id,
                },
            });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.employee.findMany();
        });
    }
    static createEmployee(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield prisma_1.prisma.department.findUnique({
                where: { id: data.departmentId },
            });
            if (!department)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService addNewEmployee] Department ID provided has not exists`,
                });
            if (data.position === client_1.Position.HEAD) {
                const headOfDepartament = yield prisma_1.prisma.employee.findFirst({
                    where: { position: client_1.Position.HEAD, departmentId: data.departmentId },
                });
                if (headOfDepartament)
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: `[EmployeeService addNewEmployee] Head of department ID provided has already exists`,
                    });
            }
            const newEmployee = yield prisma_1.prisma.employee.create({
                data,
            });
            return newEmployee;
        });
    }
    static updateEmployee(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundEmployee = yield prisma_1.prisma.employee.findFirst({
                where: {
                    id: id,
                },
            });
            if (!foundEmployee)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService updateEmployee] employee doesn't exist`,
                });
            const department = yield prisma_1.prisma.department.findUnique({
                where: { id: dto.departmentId },
            });
            if (!department)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService addNewEmployee] Department ID provided has not exists`,
                });
            if (dto.position === client_1.Position.HEAD) {
                const headOfDepartament = yield prisma_1.prisma.employee.findFirst({
                    where: { position: client_1.Position.HEAD, departmentId: dto.departmentId },
                });
                if (headOfDepartament)
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: `[EmployeeService addNewEmployee] Head of department ID provided has already exists`,
                    });
            }
            const updateEmployee = yield prisma_1.prisma.employee.update({
                where: {
                    id: id,
                },
                data: Object.assign({}, dto),
            });
            return updateEmployee;
        });
    }
    static deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedEmployee = yield prisma_1.prisma.employee.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findedEmployee)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService deleteEmployee] employee doesn't exist`,
                });
            yield prisma_1.prisma.employee.delete({
                where: {
                    id: id,
                },
            });
        });
    }
    static getEmployessByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedEmployees = yield prisma_1.prisma.employee.findMany({
                where: {
                    firstName: {
                        contains: name,
                        mode: "insensitive",
                    },
                },
                include: {
                    department: true,
                },
            });
            return findedEmployees;
        });
    }
    static getInfoAboutEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedEmployee = yield prisma_1.prisma.employee.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findedEmployee)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[EmployeeService getInfoAboutEmployee] employee doesn't exist`,
                });
            const findedEmployees = yield prisma_1.prisma.employee.findUnique({
                where: {
                    id: id,
                },
            });
            return findedEmployees;
        });
    }
    static getEmployeesOfCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield prisma_1.prisma.employee.findMany({
                where: {
                    department: {
                        companyId: id,
                    },
                },
                include: {
                    department: true,
                },
            });
            return employees;
        });
    }
    static getFiveNewestEmployeesOfCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield prisma_1.prisma.employee.findMany({
                where: {
                    department: {
                        companyId: id,
                    },
                },
                include: {
                    department: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            });
            return employees;
        });
    }
}
exports.EmployeeService = EmployeeService;
