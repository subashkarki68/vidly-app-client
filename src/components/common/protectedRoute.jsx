import { Navigate, useLocation } from "react-router-dom";
import authApi from "../../services/authService";

const ProtectedRoute = ({ element, props, ...rest }) => {
  console.log("Protected Route props", props);
  const user = authApi.getCurrentUser();
  const location = useLocation();
  if (user) {
    return element;
  } else {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
      />
    );
  }
};
export default ProtectedRoute;
