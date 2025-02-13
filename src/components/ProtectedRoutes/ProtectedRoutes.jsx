import { useContext } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { token } = useContext(TokenContext);
  if (token) {
    return children
  } else {
    return <Navigate to={"/login"} state={{ message: "Not allowed, You must log in first!" }} />
  }
};

export default ProtectedRoutes;
