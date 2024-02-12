import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import { uriService } from "../services";

type MyProps = { children?: React.ReactElement };

const RequireAuth: React.FC<MyProps> = ({ children }) => {
  const location = useLocation();
  const { ctx } = useAuth();

  return ctx.token ? children || null : <Navigate to={uriService.uriLogin()} state={location} />;
};

export { RequireAuth };