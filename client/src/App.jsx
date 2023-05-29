import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavbarWrapper from "./components/NavbarWrapper";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import UserPage from "./pages/User";

import api from "./services/api";
import AuthStore from "./stores/auth";
import { getOwnUserData } from "./services";
import PostPage from "./pages/Post";

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
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/:userId",
        element: <UserPage />,
      },
      {
        path: "/post/:postId",
        element: <PostPage />,
      },
    ],
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
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
        });

        getOwnUserData()
          .then((data) => {
            AuthStore.update((state) => {
              state.user = data;
              console.log(data);
            });
          })
          .catch((err) => {
            console.log(err);
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
