"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = void 0;
const zod_1 = __importDefault(require("zod"));
const projectSchema = zod_1.default.object({
    title: zod_1.default
        .string()
        .min(1, { message: "debes tener un titulo para el proyecto" }),
    description: zod_1.default.string().optional(),
    user: zod_1.default.string().min(1),
    category: zod_1.default.string().min(1),
    demo_url: zod_1.default
        .string()
        .min(1, { message: "debes adjuntar una url al proyecto" }),
});
const validateProject = (input) => {
    const result = projectSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validateProject = validateProject;
