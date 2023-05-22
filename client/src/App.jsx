import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import jwt_decode from "jwt-decode";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

import api from "./services/api";
import AuthStore from "./stores/auth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Feed />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <h1>path not declared</h1>,
  },
]);

function App() {
  useMemo(() => {
    AuthStore.subscribe(
      (state) => state.token,
      (newToken) => {
        if (!newToken) {
          localStorage.clear("token");
          return;
        }
        localStorage.setItem("token", newToken);

        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${tok}`;
          return config;
        });
      }
    );

    const localToken = localStorage.getItem("token");

    if (localToken) {
      const decoded = jwt_decode(localToken);

      const expired = Date.now() >= decoded.exp * 1000;

      if (expired) {
        AuthStore.update((state) => {
          state.token = null;
        });
        return;
      }

      AuthStore.update((state) => {
        state.token = localToken;
      });
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
