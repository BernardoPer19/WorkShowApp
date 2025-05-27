"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// Reutiliza la instancia en desarrollo para evitar múltiples conexiones
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        log: ["query", "error", "warn"], // Puedes quitar 'query' en producción
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
