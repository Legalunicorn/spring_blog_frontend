import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../../components/loader/Loader";

export const ProtectedRoute = () => {
  const { loading, user } = useAuthContext();
  return loading ? (
    <Loader loading={loading}/>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};
