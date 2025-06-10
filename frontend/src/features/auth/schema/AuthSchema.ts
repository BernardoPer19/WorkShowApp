import { z } from "zod";
export const UserSchema = z.object({
  user_id: z.string().uuid().optional(),
  name: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  lastname: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  toolSkills: z.array(z.string().min(1, "Cada habilidad debe ser un string no vacío")),
  profession: z.string().min(2, "La profesión debe tener al menos 2 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  portafolio_url: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  avatar_url: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  bio: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional()
});

// Extendemos con confirmPassword y validamos que coincida con password
export const UserWithConfirmPasswordSchema = UserSchema.extend({
  confirmPassword: z.string().min(6, "La confirmación debe tener al menos 6 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Aquí ponemos el campo al que se le asigna el error
});

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterType = z.infer<typeof UserWithConfirmPasswordSchema>;

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};

