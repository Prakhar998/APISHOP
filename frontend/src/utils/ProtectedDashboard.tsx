/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import Spinner from "../components/common/Spinner";

const ProtectedDashboard = () => {
  const {isAuthenticated, user, userLoading} = useSelector((state: RootState)=>state.auth);

  return (
    <>
    {userLoading ? <Spinner/> : (isAuthenticated && user.isAdmin ) ? <Outlet /> : <Navigate to="/login" />}
    </>
  )

}

export default ProtectedDashboard;
