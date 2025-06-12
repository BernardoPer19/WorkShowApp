// AuthRequest.ts
import { apiRequest } from "../../../utils/api";
import { type LoginType, type RegisterType } from "../schema/AuthSchema";

// Registro
export const RegisterAuth = async (data: RegisterType) => {
  return apiRequest({
    method: "post",
    url: "/auth/register",
    data,
    successMessage: "Usuario registrado exitosamente!",
  });
};

// Login
export const LoginAuthRequest = async (data: LoginType) => {
  return apiRequest({
    method: "post",
    url: "/auth/login",
    data,
    successMessage: "¡Inicio de sesión exitoso!",
  });
};

// Logout
export const logOutRequest = async () => {
  return apiRequest({
    method: "get",
    url: "/auth/logout",
  });
};

// Obtener usuario actual
export const getCurrentUser = async () => {
  return apiRequest({
    method: "get",
    url: "/auth/currentUser",
  });
};
