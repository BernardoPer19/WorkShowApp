import type { LoginType, RegisterType } from "../schema/AuthSchema";
import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const RegisterAuth = async (data: RegisterType) => {
  try {
    const response = await axios.post("/auth/register", data);
    toast.success(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.errors || error.response.data?.message;
      toast.error(backendMessage)
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};
export const LoginAuthRequest = async (data: LoginType) => {
  try {
    const response = await axios.post("/auth/login", data);
    toast.success(response.data)


    return response.data;
  } catch (error) {

    if (error instanceof AxiosError && error.response) {

      const backendMessage =
        error.response.data?.errors || error.response.data?.message;
      toast.success(backendMessage)

      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};
export const logOutRequest = async () => {
  const response = axios.get("/auth/logou");
  return (await response).data;
};

export const ProtectedRoute = async () => { };

export const getCurrentUser = async () => {
  const response = await axios.get("/auth/currentUser");
  return response.data;
};
