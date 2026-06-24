import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

/** Guard administrator pages behind the persisted administrator flag. */
function AdminRoute({ children }: AdminRouteProps) {
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!isAdmin) {
    return <Navigate to="/estatisticas" replace />;
  }

  return children;
}

export default AdminRoute;
