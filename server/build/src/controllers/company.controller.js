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
exports.CompanyController = void 0;
const server_1 = require("@trpc/server");
const _ompany_service_1 = require("../services/\u0441ompany.service");
class CompanyController {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _ompany_service_1.CompanyService.getAllCompanies();
                return {
                    status: "success",
                    data: {
                        result,
                    },
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[CompanyController getAll] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static addCompany({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _ompany_service_1.CompanyService.addNewCompany(input);
                return {
                    status: "success",
                    data: {
                        result,
                    },
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[CompanyController addCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static updateCompany({ paramsInput, input, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _ompany_service_1.CompanyService.updateCompany(paramsInput.companyId, input);
                return {
                    status: "success",
                    data: {
                        result,
                    },
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[CompanyController updateCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static deleteCompany({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _ompany_service_1.CompanyService.deleteCompany(paramsInput.companyId);
                return {
                    status: "success",
                    data: null,
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[CompanyController deleteCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static findInfoAboutCompany({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _ompany_service_1.CompanyService.getInfoAboutCompany(paramsInput.companyId);
                return {
                    status: "success",
                    data: result,
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[CompanyController deleteCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
}
exports.CompanyController = CompanyController;
