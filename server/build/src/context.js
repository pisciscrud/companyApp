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
exports.createContext = exports.createInnerTRPCContext = void 0;
const prisma_1 = require("./prisma");
function createInnerTRPCContext(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign({ prisma: prisma_1.prisma }, opts);
    });
}
exports.createInnerTRPCContext = createInnerTRPCContext;
const createContext = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    function getUserFromHeader() {
        var _a;
        if ((_a = opts === null || opts === void 0 ? void 0 : opts.req) === null || _a === void 0 ? void 0 : _a.headers.authorization) {
            const token = opts === null || opts === void 0 ? void 0 : opts.req.headers.authorization.split(" ")[1];
            return token;
        }
        return null;
    }
    const innerContext = yield createInnerTRPCContext({
        req: opts === null || opts === void 0 ? void 0 : opts.req,
        token: getUserFromHeader(),
    });
    return Object.assign(Object.assign({}, innerContext), { req: opts === null || opts === void 0 ? void 0 : opts.req });
});
exports.createContext = createContext;
