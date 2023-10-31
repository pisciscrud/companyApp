"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanySchema = exports.companyParams = exports.CreateCompanySchema = void 0;
const zod_1 = require("zod");
exports.CreateCompanySchema = (0, zod_1.object)({
    name: (0, zod_1.string)({
        required_error: "Name is required",
    }),
    description: (0, zod_1.string)({
        required_error: "Descriprion is required",
    }),
});
exports.companyParams = (0, zod_1.object)({
    companyId: (0, zod_1.number)(),
});
exports.UpdateCompanySchema = (0, zod_1.object)({
    params: exports.companyParams,
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        description: (0, zod_1.string)(),
    }).partial(),
});
