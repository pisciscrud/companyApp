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
exports.EmployeeController = void 0;
const server_1 = require("@trpc/server");
const employess_service_1 = require("../services/employess.service");
class EmployeeController {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.getAll();
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
                    message: `[EmployeeController getAll] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static addNewEmployee({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.createEmployee(input);
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
                    message: `[EmployeeController addNewEmployee] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static updateEmployee({ paramsInput, input, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.updateEmployee(paramsInput.idEmployee, input);
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
                    message: `[EmployeeController updateEmployee] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static deleteEmployee({ paramsInput }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield employess_service_1.EmployeeService.deleteEmployee(paramsInput.idEmployee);
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
                    message: `[EmployeeController deleteEmployee] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static findEmployeesByName({ paramInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.getEmployessByName(paramInput.name);
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
                    message: `[EmployeeController findEmployeesByName] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static findInfoAboutEmployee({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.getInfoAboutEmployee(paramsInput.idEmployee);
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
                    message: `[EmployeeController findInfoAboutEmployee] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static getEmployeesOfCompany({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.getEmployeesOfCompany(paramsInput.companyId);
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
                    message: `[EmployeeController getEmployeesOfCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static getFiveEmployeesOfCompany({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield employess_service_1.EmployeeService.getFiveNewestEmployeesOfCompany(paramsInput.companyId);
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
                    message: `[EmployeeController getEmployeesOfCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
