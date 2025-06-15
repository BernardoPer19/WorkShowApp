import { prisma } from "@/config/prisma";

class SaveService {
    // Guardar un proyecto para un usuario
    static async save(userId: string, projectId: string) {
        try {
            // Verifica si el proyecto ya está guardado por el usuario
            const existing = await prisma.savedProject.findFirst({
                where: {
                    userId,
                    projectId
                },
            });

            if (existing) {
                throw new Error("Project already saved.");
            }

            const saved = await prisma.savedProject.create({
                data: {
                    userId,
                    projectId
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
