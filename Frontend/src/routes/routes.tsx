import { ReactElement, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { useUser } from "../hooks/userHooks";
import { Error404 } from "../pages/Error404";

interface ChildrenTypes {
  children: ReactElement;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Public = ({ children }: ChildrenTypes) => {
  return children;
};

const PrivateRoute = ({ children }: ChildrenTypes) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="*"  element={<Error404 />} />
        <Route
          path="/"
          element={
            <Public>
              <Home />
            </Public>
          }
        />
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
