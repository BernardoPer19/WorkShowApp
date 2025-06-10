// authUtils.ts
import { UserType } from "@/types/AuthTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const createToken = (user: UserType): string => {
  const jwtSecret = process.env.JWT_PASSWORD;
  if (!jwtSecret) {
    throw new Error("JWT_PASSWORD environment variable is not defined");
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      profession: user.profession,
      created_at: user.created_at,
      bio: user.bio,
      avatar_url: user.avatar_url,
      portafolio_url: user.portafolio_url
      // ✅ NO incluyas password en el token por seguridad
    },
    jwtSecret,
    { expiresIn: "24h" }
  );
  return token;
};