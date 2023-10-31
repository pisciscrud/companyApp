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
exports.adminProcedure = exports.baseProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const auth_service_1 = require("./services/auth.service");
const user_service_1 = require("./services/user.service");
const t = server_1.initTRPC.context().create();
const middleware = t.middleware;
const isAdmin = middleware((opts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ctx } = opts;
        const token = ctx.token;
        const payload = auth_service_1.AuthService.verifyToken(token);
        yield user_service_1.UserService.getById(payload.id);
        return opts.next();
    }
    catch (error) {
        throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
    }
}));
exports.router = t.router;
exports.baseProcedure = t.procedure;
exports.adminProcedure = t.procedure.use(isAdmin);
