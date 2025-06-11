
export type uuidType =
  | `${string}-${string}-${string}-${string}-${string}`
  | undefined;

export type UserType = {
  name: string;
  tecnologies: string[];
  name: string
  lastname: string
  username: string;
  email: string;
  password: string;
  profession: string;
  user_id?: string;
  bio?: string;
  avatar_url?: string;
  portafolio_url?: string;
  created_at: Date;
};
export type registerUserType = Pick<
  UserType,
  "username" | "email" | "password" | "created_at" | "profession" | "user_id" | "tecnologies"
>;


export type loginUserType = Pick<UserType, "email" | "password" | "username">;
