import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
const {userInfo} = useSelector((state:any) => state.auth);

return userInfo ? <Outlet /> : <Navigate to="/login" replace/>;
};