import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginAuthRequest, RegisterAuth } from "../api/AuthRequest";
import { toast } from "sonner";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const handleSuccess = (message: string, bienvenida?: string) => {
    toast.success(message);
    if (bienvenida) console.info("🎉 Bienvenida:", bienvenida);
  };

  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);

    const status = error?.response?.status;
    const apiMessage = error?.response?.data?.message;
    const fallbackMessage = error?.message || "Error desconocido";

    let finalMessage = "Ocurrió un error";

    if (status === 400) {
      finalMessage = apiMessage || "Solicitud inválida";
    } else if (status === 401) {
      finalMessage = "Credenciales incorrectas";
    } else if (status === 403) {
      finalMessage = "Acceso denegado";
    } else if (status === 404) {
      finalMessage = "Recurso no encontrado";
    } else if (status >= 500) {
      finalMessage = "Error interno del servidor";
    } else {
      finalMessage = apiMessage || fallbackMessage;
    }

    toast.error(`${context}: ${finalMessage}`);
  };

  const {
    mutate: registerMutate,
    isError: isRegisterError,
    isPending: isRegisterPending,
    error: registerError,
    reset: resetRegister,
  } = useMutation({
    mutationFn: RegisterAuth,
    onSuccess: (data) => {
      handleSuccess(data.message, data.bienvenida);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      handleError("Registro", error);
    },
  });

  const {
    mutate: loginMutate,
    isError: isLoginError,
    isPending: isLoginLoading,
    error: loginError,
    reset: loginReset,
  } = useMutation({
    mutationFn: LoginAuthRequest,
    onSuccess: (data) => {
      handleSuccess(data.message, data.bienvenida);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      handleError("Inicio de sesión", error);
    },
  });

  return {
    login: {
      loginError,
      loginMutate,
      loginReset,
      isLoginError,
      isLoginLoading,
    },

    register: {
      registerError,
      registerMutate,
      isRegisterPending,
      isRegisterError,
      resetRegister,
    },
  };
};
