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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const server_1 = require("@trpc/server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.getByEmail(email);
            const passwordHash = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordHash)
                throw new server_1.TRPCError({
                    code: "UNAUTHORIZED",
                    message: `[AuthService signIn] Password or email do not match`,
                });
            const jwt = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET);
            return { jwt };
        });
    }
    static verifyToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        return payload;
    }
}
exports.AuthService = AuthService;
