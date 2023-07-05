import React from "react";

import Buildings from "pages/Buildings";
import Needs from "pages/Needs";
import Items from "pages/Items";

import { BsFillBuildingFill } from "react-icons/bs";
import { SiMaterialdesignicons } from 'react-icons/si'
import { GiCargoCrane } from 'react-icons/gi'
import { useTranslation } from "react-i18next";
import { GoPackage } from "react-icons/go"
import { TbUsers } from "react-icons/tb"
import Orders from "pages/Orders";
import Users from "pages/Users";
import { useNavigate } from "react-router-dom";


function useRoutes() {
  const { t } = useTranslation()
  let usr = JSON.parse(sessionStorage.getItem('user'));
  let userName = usr?.fullname;
  let email = usr?.email;
  let role = usr?.role;
  let usrId = usr?.id;
  let token = usr?.token;

  const routes = []; 

  const navigate = useNavigate();
  if (!usr)
    navigate('/Login');

  if (role === "only_read"||role==="admin"||role==="officer_eng") {
    routes.push({
      name: t("sidebarLinks.buildings"),
      path: "/",
      icon: <BsFillBuildingFill className="h-4 w-4" />,
      component: <Buildings />,
    },


    )
  }
  routes.push(

    {
      name: t("sidebarLinks.needs"),
      path: "/needs",
      icon: <SiMaterialdesignicons className="h-4 w-4" />,
      component: <Needs />,
    },
    {
      name: t("sidebarLinks.items"),
      path: "/items",
      icon: <GiCargoCrane className="h-4 w-4" />,
      component: <Items />,
    },
    {
      name: t("sidebarLinks.orders"),
      path: "/orders",
      icon: <GoPackage className="h-4 w-4" />,
      component: <Orders />,
    },


  )
  if (usr?.role === "admin" || usr?.role === "only_read") {
    routes.push(
      {
        name: t("sidebarLinks.users"),
        path: "/users",
        icon: <TbUsers className="h-4 w-4" />,
        component: <Users />,
      },

    )
  }






  return { routes }
}


export default useRoutes;