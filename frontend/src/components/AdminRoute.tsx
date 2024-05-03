import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = () => {
const {userInfo} = useSelector((state:any) => state.auth);

return userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>;
};