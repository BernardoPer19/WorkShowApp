export interface UserType {
  user_id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  bio?: string;
  avatar_url?: string;
  profession: string;
  portafolio_url?: string;
}

export type registerUserType = Pick<
  UserType,
  "username" | "email" | "password" | "created_at" | "profession" | "user_id"
>;

export type loginUserType = Pick<UserType, "email" | "password" | "username">;
