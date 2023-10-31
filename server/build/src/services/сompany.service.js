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
exports.CompanyService = void 0;
const prisma_1 = require("../prisma");
const server_1 = require("@trpc/server");
class CompanyService {
    static getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = yield prisma_1.prisma.company.findMany();
            return companies;
        });
    }
    static addNewCompany(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedCompany = yield prisma_1.prisma.company.findFirst({
                where: {
                    name: dto.name,
                },
            });
            if (existedCompany) {
                if (existedCompany)
                    throw new server_1.TRPCError({
                        code: "BAD_REQUEST",
                        message: `[CompanyService addNewCompany] Company with this name exist`,
                    });
            }
            const newCompany = yield prisma_1.prisma.company.create({
                data: dto,
            });
            return newCompany;
        });
    }
    static updateCompany(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedCompany = yield prisma_1.prisma.company.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findedCompany) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[CompanyService updateCompany] Provided company hasn't exist`,
                });
            }
            return yield prisma_1.prisma.company.update({
                where: {
                    id: id,
                },
                data: dto,
            });
        });
    }
    static deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findedCompany = yield prisma_1.prisma.company.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findedCompany) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[CompanyService deleteCompany] Provided company hasn't exist`,
                });
            }
            yield prisma_1.prisma.company.delete({
                where: {
                    id: id,
                },
            });
        });
    }
    static getInfoAboutCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCompany = yield prisma_1.prisma.company.findFirst({
                where: {
                    id: id,
                },
            });
            if (!foundCompany) {
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[CompanyService getInfoAboutCompany] Provided company hasn't exist`,
                });
            }
            const company = yield prisma_1.prisma.company.findFirst({
                where: {
                    id: id,
                },
                include: {
                    departments: {
                        include: {
                            employees: true,
                        },
                    },
                },
            });
            return company;
        });
    }
}
exports.CompanyService = CompanyService;
