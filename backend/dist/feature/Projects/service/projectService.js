"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjectThatUser = void 0;
const transformBuffer_1 = require("../utils/transformBuffer");
const prisma_1 = require("@/config/prisma");
const getProjectThatUser = async (id) => {
    const project = await prisma_1.prisma.projects.findUnique({
        where: { id: (0, transformBuffer_1.uuidToBuffer)(id) },
    });
    if (!project) {
        throw new Error("Proyecto no encontrado");
    }
    return {
        id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.id)),
        title: project.title,
        description: project.description,
        user_id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.user_id)),
        category_id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.category_id)),
        demo_url: project.demo_url,
        created_at: project.created_at,
    };
};
exports.getProjectThatUser = getProjectThatUser;
const createProject = async (input) => {
    const project = await prisma_1.prisma.projects.create({
        data: {
            title: input.title,
            description: input.description,
            user_id: (0, transformBuffer_1.uuidToBuffer)(input.user_id),
            category_id: (0, transformBuffer_1.uuidToBuffer)(input.category_id),
            created_at: input.created_at,
        },
    });
    return {
        id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.id)),
        title: project.title,
        description: project.description,
        user_id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.user_id)),
        category_id: (0, transformBuffer_1.bufferToUUID)(Buffer.from(project.category_id)),
        demo_url: project.demo_url,
        created_at: project.created_at,
    };
};
exports.createProject = createProject;
