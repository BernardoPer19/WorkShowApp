import { comparePassword, hashPassword } from "../utils/AuthUtils";
import { RegisterTypeSchema } from "../schemas/AuthSchea";
import { prisma } from "../../../config/prisma";
import { UserType } from "@/feature/collections/schemas/Schema";

export class AuthService {
  static async registerUser(data: RegisterTypeSchema) {
    const existingUser = await prisma.users.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const hashingPassword = await hashPassword(data.password);

    const createUser = await prisma.users.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: hashingPassword,
        profession: data.profession,
        toolSkills: {
          set: data.tecnologies // asumiendo que en la base es tipo array o relación de strings
        },
        portafolio_url: data.portafolio_url, // opcional
        avatar_url: data.avatar_url, // opcional
        bio: data.bio // opcional
      },
    });

    if (data.tecnologies && data.tecnologies.length > 0) {
      for (const techName of data.tecnologies) {
        let technology = await prisma.tecnologies.findUnique({
          where: { name: techName },
        });

        if (!technology) {
          technology = await prisma.tecnologies.create({
            data: { name: techName },
          });
        }

        await prisma.userTecnology.create({
          data: {
            user_id: createUser.user_id,
            tecnology_id: technology.tecnology_id,
          },
        });
      }
    }

    return createUser;
  }
  static async verifyEmail(email: string) {
    try {
      const foundEmail = await prisma.users.findFirst({ where: { email } });
      return !!foundEmail;
    } catch (error) {
      throw new Error("Error al verificar el correo");
    }
  }

  static async LoginService(email: string, password: string) {
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }

  static async getUserProfile(userId: string): Promise<UserType> {
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        name: true,
        lastname: true,
        username: true,
        email: true,
        profession: true,
        password: true,
        bio: true,
        avatar_url: true,
        portafolio_url: true,
        created_at: true,
        userTecnologies: {
          select: {
            tecnology: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const tecnologies: string[] = user.userTecnologies.map(
      (ut: any) => ut.tecnology.name
    );

    return {
      user_id: user.user_id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      tecnologies,
      profession: user.profession ?? "",
      password: "", // Nunca retornar la contraseña real
      created_at: user.created_at,
      portafolio_url: user.portafolio_url ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
      bio: user.bio ?? undefined,
    };
  }
}