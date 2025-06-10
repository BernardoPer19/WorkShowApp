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



    toast.error(`${context}: ${error}`);
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
      console.log(error.message);
      
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
