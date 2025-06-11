
export type uuidType =
  | `${string}-${string}-${string}-${string}-${string}`
  | undefined;

export interface UserType {
  user_id: string;
  username: string;
  email: string;
  profession: string | null;
  created_at: Date;
  bio: string | null;
  password?: string;
  avatar_url: string | null;
  portafolio_url: string | null;
  tecnologies: string[]
}
export type registerUserType = Pick<
  UserType,
  "username" | "email" | "password" | "created_at" | "profession" | "user_id" | "tecnologies"
>;


export type loginUserType = Pick<UserType, "email" | "password" | "username">;
