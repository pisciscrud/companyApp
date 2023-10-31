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
exports.DepartamentController = void 0;
const server_1 = require("@trpc/server");
const departament_service_1 = require("../services/departament.service");
class DepartamentController {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.getAllDepartaments();
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
                    message: `[DepartamentController getAll] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static getInfoAboutDepartament({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.getInfoAboutDepartament(paramsInput.idDepartament);
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
                    message: `[DepartamentController getInfoAboutDepartament] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static getDepartamentsOfCompany({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.getAllDepartamentsOfCompany(paramsInput.idCompany);
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
                    message: `[DepartamentController getDepartamentsOfCompany] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static findFiveLargest({ paramsInput }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.findFiveLargestDepartamentsOfCompany(paramsInput.idCompany);
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
                    message: `[DepartamentController findFiveLargest] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static addDepartament({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.createNewDepartament(input);
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
                    message: `[DepartamentController addDepartament] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static updateDepartament({ paramsInput, input, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield departament_service_1.DepartamentService.updateDepartament(paramsInput.idDepartament, input);
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
                    message: `[DepartamentController updateDepartament] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
    static deleteDepartament({ paramsInput, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield departament_service_1.DepartamentService.deleteDepartament(paramsInput.idDepartament);
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[DepartamentController deleteDepartament] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
}
exports.DepartamentController = DepartamentController;
