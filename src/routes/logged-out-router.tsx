import React from "react";
import { IsLoggedInVar } from "../apollo";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import CreateAccount from "../Pages/CreateAccount";
import { NotFound } from "../Pages/404";

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path={"/create-account"} element={<CreateAccount />} />
      <Route path={"/"} element={<LoginPage />} />
      <Route path={"/*"} element={<NotFound />} />
    </Routes>
  );
};
