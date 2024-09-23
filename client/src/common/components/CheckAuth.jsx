import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children }) => {
 

  const location = useLocation();

  if (
    !isAuth &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/login" />;
  }

  if (
    isAuth &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role == "admin") {
      return <Navigate to="/admin/create" />;
    } else {
      return <Navigate to={"/homepage"} />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
