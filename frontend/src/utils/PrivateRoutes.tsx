/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import Spinner from "../components/common/Spinner";

const ProtectedRoute = () => {
  const {isAuthenticated, userLoading} = useSelector((state: RootState)=>state.auth);

  return (
    <>
    {userLoading ? <Spinner/> : isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </>
  )

}

export default ProtectedRoute;
