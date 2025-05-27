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

    const hashingPassowrd = await hashPassowrd(data.password);

    const createUser = await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashingPassowrd,
        profession: data.profession,
      },
    });

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
}
