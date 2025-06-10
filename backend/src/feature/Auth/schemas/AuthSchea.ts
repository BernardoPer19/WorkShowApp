import { z } from "zod";

export const UserSchema = z.object({
  user_id: z.string().uuid().optional(),
  name: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  lastname: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),

  toolSkills: z.array(z.string().min(1, "Cada habilidad debe ser un string no vacío")),
  profession: z
    .string()
    .min(2, "La profesión debe tener al menos 2 caracteres"),

  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),

  portaolio_url: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  avatar_url: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  bio: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional()
});

const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterTypeSchema = z.infer<typeof UserSchema>;

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};

export const validateRegister = (input: unknown): RegisterTypeSchema => {
  const result = UserSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
