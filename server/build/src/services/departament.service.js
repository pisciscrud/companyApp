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
exports.DepartamentService = void 0;
const prisma_1 = require("../prisma");
const server_1 = require("@trpc/server");
class DepartamentService {
    static getAllDepartaments() {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield prisma_1.prisma.department.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    employees: true,
                    company: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return departments;
        });
    }
    static findFiveLargestDepartamentsOfCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedCompany = yield prisma_1.prisma.company.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findedCompany) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[DepartamentService findFiveLargestDepartamentsOfCompany] Provided departament han't exist`,
                });
            }
            const departments = yield prisma_1.prisma.department.findMany({
                where: {
                    companyId: id,
                },
                include: {
                    employees: true,
                },
                orderBy: {
                    employees: {
                        _count: "desc",
                    },
                },
                take: 5,
            });
            return departments;
        });
    }
    static getAllDepartamentsOfCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departaments = yield prisma_1.prisma.department.findMany({
                where: {
                    companyId: id,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    employees: true,
                    createdAt: true,
                    updatedAt: true,
                    companyId: true,
                },
            });
            return departaments;
        });
    }
    static deleteDepartament(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundDepartament = yield prisma_1.prisma.department.findFirst({
                where: {
                    id: id,
                },
            });
            if (!foundDepartament) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[DepartamentService deleteDepartament] Provided departament han't exist`,
                });
            }
            return yield prisma_1.prisma.department.delete({
                where: {
                    id: id,
                },
            });
        });
    }
    static updateDepartament(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundDepartament = yield prisma_1.prisma.department.findFirst({
                where: {
                    id: id,
                },
            });
            if (!foundDepartament) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[DepartamentService updateDepartament] Provided departament han't exist`,
                });
            }
            const updateDepartament = yield prisma_1.prisma.department.update({
                where: {
                    id: id,
                },
                data: Object.assign({}, dto),
            });
            return updateDepartament;
        });
    }
    static createNewDepartament(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartament = yield prisma_1.prisma.department.create({
                data: input,
            });
            return newDepartament;
        });
    }
    static getInfoAboutDepartament(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundDepartament = yield prisma_1.prisma.department.findFirst({
                where: {
                    id: id,
                },
            });
            if (!foundDepartament) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[DepartamentService getInfoAboutDepartament] Provided departament han't exist`,
                });
            }
            const foundCompany = yield prisma_1.prisma.department.findFirst({
                where: {
                    id: id,
                },
                include: {
                    employees: true,
                },
            });
            return foundCompany;
        });
    }
}
exports.DepartamentService = DepartamentService;
