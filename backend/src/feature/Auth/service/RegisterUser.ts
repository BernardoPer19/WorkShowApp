import { comparePassword, hashPassowrd } from "../utils/AuthUtils";
import { RegisterTypeSchema } from "../schemas/AuthSchea";
import { prisma } from "../../../config/prisma";

export class AuthService {
  static async registerUser(data: RegisterTypeSchema) {
    const existingUser = await prisma.users.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const hashingPassword = await hashPassowrd(data.password);

    const createUser = await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashingPassword,
        profession: data.profession,
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

  static async getUserProfile(userId: string) {
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      select: {
        username: true,
        email: true,
        profession: true,
        bio: true,
        avatar_url: true,
        portafolio_url: true,
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

    const technologiesNames = user.userTecnologies.map((t) => t.tecnology.name);

    return { ...user, tecnologies: technologiesNames };
  }
}
