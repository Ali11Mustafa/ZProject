import React from "react";

import Buildings from "pages/Buildings";
import Needs from "pages/Needs";
import Items from "pages/Items";
import Dashboard from "views/dashboard";
import { useTranslation } from "react-i18next";
import Orders from "pages/Orders";
import Users from "pages/Users";
import { useNavigate } from "react-router-dom";
import BuildingsSvg from "assets/icons/BuildingsSvg";
import NeedsSvg from "assets/icons/NeedsSvg";
import ItemsSvg from "assets/icons/itemsSvg";
import OrdersSvg from "assets/icons/OrdersSvg";
import UsersSvg from "assets/icons/UsersSvg";
import HomeSvg from "assets/icons/HomeSvg";
import { BsCart } from "react-icons/bs";

function useRoutes() {
  const { t } = useTranslation();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;

  const routes = [];

  const navigate = useNavigate();
  if (!usr) navigate("/Login");

  if (role === "only_read" || role === "admin" || role === "officer_eng") {
    routes.push(
      {
        name: t("sidebarLinks.dashboard"),
        path: "/",
        icon: <HomeSvg />,
        component: <Dashboard />,
      },
      {
        name: t("sidebarLinks.buildings"),
        path: "/buildings",
        icon: <BuildingsSvg />,
        component: <Buildings />,
      }
    );
  }
  routes.push(
    {
      name: t("sidebarLinks.needs"),
      path: "/needs",
      icon: <NeedsSvg />,
      component: <Needs />,
    },
    {
      name: t("sidebarLinks.items"),
      path: "/items",
      icon: <ItemsSvg />,
      component: <Items />,
    },
    {
      name: t("sidebarLinks.orders"),
      path: "/orders",
      icon: <OrdersSvg />,
      component: <Orders />,
    }
  );
  if (usr?.role === "admin" || usr?.role === "only_read") {
    routes.push({
      name: t("sidebarLinks.users"),
      path: "/users",
      icon: <UsersSvg />,
      component: <Users />,
    });
  }

  return { routes };
}

export default useRoutes;
