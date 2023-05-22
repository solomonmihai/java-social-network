import { Navigate } from "react-router-dom";

import AuthStore from "../stores/auth";

export default function PrivateRoute({ children }) {
  const token = AuthStore.useState((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
