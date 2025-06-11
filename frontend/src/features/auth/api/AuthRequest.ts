// AuthRequest.ts
import {type LoginType, type RegisterType } from "../schema/AuthSchema";
import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const RegisterAuth = async (data: RegisterType) => {
  try {
    const response = await axios.post("/auth/register", data);
    toast.success("Usuario registrado exitosamente!"); // ✅ Mensaje fijo
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {

      const backendMessage =
        error.response.data?.errors || error.response.data?.message;
      toast.error(backendMessage);
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};

export const LoginAuthRequest = async (data: LoginType) => {
  try {
    const response = await axios.post("/auth/login", data);
    toast.success("¡Inicio de sesión exitoso!"); // ✅ Mensaje fijo
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.errors || error.response.data?.message;
      toast.error(backendMessage);
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al iniciar sesión.");
  }
};

export const logOutRequest = async () => {
  try {
    const response = await axios.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
};


export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/auth/currentUser");
    
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.errors || error.response.data?.message;

      if (error.response.status !== 401) {
        toast.error(backendMessage);
      }

      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener el usuario.");
  }
};