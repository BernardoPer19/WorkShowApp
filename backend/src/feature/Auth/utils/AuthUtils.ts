import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

export const hashPassowrd = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const createToken = (user: JwtPayload): string => {
  const jwtSecret = process.env.JWT_PASSWORD;
  if (!jwtSecret) {
    throw new Error("JWT_PASSWORD environment variable is not defined");
  }
  const token = jwt.sign(
    {
      user_id: user.user_id,
      nombre: user.nombre,
      email: user.email,
      fechaCreacion: user.fechaCreacion,
      rol: user.rol,
    },
    jwtSecret,
    { expiresIn: "24h" }
  );
  return token;
};
