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
exports.UserService = void 0;
const server_1 = require("@trpc/server");
const prisma_1 = require("../prisma");
class UserService {
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[UserService getByEmail] User email provided has not exists`,
                });
            return user;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
            if (!user)
                throw new server_1.TRPCError({
                    code: "BAD_REQUEST",
                    message: `[UserService getById] User ID provided has not exists`,
                });
            return user;
        });
    }
}
exports.UserService = UserService;
