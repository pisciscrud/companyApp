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
exports.AuthController = void 0;
const server_1 = require("@trpc/server");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static signIn({ input, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield auth_service_1.AuthService.signIn(input.email, input.password);
                return {
                    status: "success",
                    data: {
                        data,
                    },
                };
            }
            catch (error) {
                if (error instanceof server_1.TRPCError)
                    throw error;
                throw new server_1.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `[AuthController signIn] ${(error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.stack)}`,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
