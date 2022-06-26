import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

export const LogOut = () => {
  const { signout } = useAuth();

  useEffect(() => {
    signout();
  }, []);

  return <Navigate to="/home" />;
};
