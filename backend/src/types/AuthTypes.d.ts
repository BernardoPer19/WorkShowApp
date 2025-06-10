export type uuidType =
  | `${string}-${string}-${string}-${string}-${string}`
  | undefined;

export interface UserType {
  user_id: string;
  username: string;
  email: string;
  profession: string | null; // ✅ Cambiar a null en lugar de undefined
  created_at: Date;
  bio: string | null; // ✅ Cambiar a null en lugar de undefined
  password?: string; // ✅ Opcional para cuando no necesites la contraseña
  avatar_url: string | null; // ✅ Agregar si lo usas
  portafolio_url: string | null; // ✅ Agregar si lo usas
}
export type registerUserType = Pick<
  UserType,
  "username" | "email" | "password" | "created_at" | "profession" | "user_id"
>;

export type loginUserType = Pick<UserType, "email" | "password" | "username">;
