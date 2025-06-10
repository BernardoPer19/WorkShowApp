import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../features/auth/context/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está bien, renderiza la ruta protegida
  return <Outlet />;
}
