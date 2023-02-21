import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = ({ admin, redirectPath = "/", children }) => {
  const { user } = useAuth();

  if (!user || (admin && !user.isAdmin)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
