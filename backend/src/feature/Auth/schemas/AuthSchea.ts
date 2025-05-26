import { z } from "zod";

export const RegisterSchema = z.object({
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

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;

export const validateRegister = (input: unknown): RegisterTypeSchema => {
  const result = RegisterSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
