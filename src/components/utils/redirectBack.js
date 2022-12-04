import { useNavigate, useLocation, Navigate } from "react-router-dom";
import React from "react";

export default function RedirectBack() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return <Navigate to={params.get("redirect") ?? "/"} />;
}
