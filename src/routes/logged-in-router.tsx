import React from "react";

import { useRoutes, Navigate } from "react-router";

import { Restaurants } from "../Pages/client/Restaurants";
import { Header } from "../components/Header";

import { useMe } from "../hooks/useMe";
import { NotFound } from "../Pages/404";
import { ConfirmEmail } from "../Pages/user/confirm-email";
import { UserRole } from "../__generated__/globalTypes";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  const clientRoutes = useRoutes([
    { path: "/", element: <Restaurants /> },
    { path: "/my-profile", element: <Restaurants /> },
    { path: "/confirm", element: <ConfirmEmail /> },
    { path: "/*", element: <NotFound /> },
  ]);
  const Table = {
    data: {
      [UserRole.Client]: clientRoutes,
      // [UserRole.Owner]: ownerRoutes,
      // [UserRole.Delivery]: deliveryRoutes,
    },
    process(role: UserRole) {
      return this.data[UserRole.Client];
    },
  };
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-white">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      {Table.process(data.Me.role)}
    </>
  );
};
