import { prisma } from "@/config/prisma";
import { SaveProjectInput } from "../schemas/SaveSchema";

class SaveService {
    // Guardar un proyecto para un usuario
    static async save(data: SaveProjectInput) {
        try {
            // Verifica si el proyecto ya está guardado por el usuario
            const existing = await prisma.savedProject.findFirst({
                where: {
                    userId: data.userId,
                    projectId: data.projectId,
                },
            });

            if (existing) {
                throw new Error("Project already saved.");
            }

            const saved = await prisma.savedProject.create({
                data: {
                    userId: data.userId,
                    projectId: data.projectId,
                },
            });

            return saved;
        } catch (error) {
            throw new Error(`Error saving project: ${error}`);
        }
    }

    // Obtener todos los proyectos guardados por un usuario
    static async getSaved(userId: string) {
        try {
            const savedProjects = await prisma.savedProject.findMany({
                where: { userId },
                include: {
                    project: true,
                },
            });

            return savedProjects;
        } catch (error) {
            throw new Error(`Error fetching saved projects: ${error}`);
        }
    }

    // Eliminar un proyecto guardado
    static async delete(userId: string, projectId: string) {
        try {
            await prisma.savedProject.deleteMany({
                where: {
                    userId,
                    projectId,
                },
            });

            return { message: "Project removed from saved list." };
        } catch (error) {
            throw new Error(`Error deleting saved project: ${error}`);
        }
    }
}

export default SaveService;
