"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.UpdateDepartamentSchema = exports.paramCompany = exports.paramDepartament = exports.CreateDepartamentSchema = void 0;
const zod_1 = require("zod");
exports.CreateDepartamentSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({
        required_error: 'Name is required',
    }),
    companyId: (0, zod_1.number)({
        required_error: 'Company is required',
    }),
    description: (0, zod_1.string)({
        required_error: 'Descriprion is required',
    }),
});
exports.paramDepartament = (0, zod_1.object)({
    idDepartament: (0, zod_1.number)(),
});
exports.paramCompany = (0, zod_1.object)({
    idCompany: (0, zod_1.number)()
});
exports.UpdateDepartamentSchema = (0, zod_1.object)({
    paramDepartament: exports.paramDepartament,
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        description: (0, zod_1.string)(),
    }).partial(),
});
exports.filterQuery = (0, zod_1.object)({
    limit: (0, zod_1.number)().default(1),
    page: (0, zod_1.number)().default(10),
});
