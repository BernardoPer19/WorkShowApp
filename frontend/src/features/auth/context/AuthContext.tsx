import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useContext,
} from "react";
import { getCurrentUser, logOutRequest } from "../api/AuthRequest";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { UserType } from "../types/AuthTypes";

interface AuthContextType {
  logout: () => void;
  currentUser: UserType;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}
interface ChildrenType {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: ChildrenType) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { data: currentUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const logout = async () => {
    try {
      await logOutRequest();
      Cookies.remove("access_token");
      queryClient.removeQueries({ queryKey: ["currentUser"] });

      setIsAuthenticated(false);
      navigate("/login");
      toast.success("¡Sesión cerrada exitosamente!");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  useEffect(() => {
    setIsAuthenticated(!isAuthLoading && !!currentUser);
  }, [currentUser, isAuthLoading]);

  const values = {
    currentUser,
    isAuthenticated,
    isAuthLoading,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
