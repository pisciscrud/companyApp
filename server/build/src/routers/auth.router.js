"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const controllers_1 = require("../controllers");
const trpc_1 = require("../trpc");
const auth_schema_1 = require("../schema/auth.schema");
exports.authRouter = (0, trpc_1.router)({
    signIn: trpc_1.baseProcedure.input(auth_schema_1.SignInSchema).mutation(({ input }) => controllers_1.AuthController.signIn({ input })),
});
