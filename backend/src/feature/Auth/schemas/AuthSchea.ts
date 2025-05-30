import { z } from "zod";

export const UserSchema = z.object({
  user_id: z.string().uuid().optional(),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  profession: z
    .string()
    .min(2, "La profesión debe tener al menos 2 caracteres")
    .optional(),
});

const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
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
