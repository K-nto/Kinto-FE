import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthenticated } from "../../../store/app/app.selector";

export const RequireAuth = ({ children }) => {
  const authenticated = useSelector(selectAuthenticated);
  if (!authenticated) return <Navigate to="/login" />;

  return children;
};
