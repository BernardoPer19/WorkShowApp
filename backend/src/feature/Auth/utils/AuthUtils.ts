import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

export const hashPassowrd = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};


export const createToken = () => {};
