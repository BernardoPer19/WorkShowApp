interface UserType {
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

type registerUserType = Pick<
  UserType,
  "username" | "email" | "password" | "created_at" | "profession" | "user_id"
>;

type loginUserType = Pick<UserType, "email" | "password" | "username">;
