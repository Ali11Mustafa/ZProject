import BuildingsSvg from "assets/icons/BuildingsSvg";
import HomeSvg from "assets/icons/HomeSvg";
import ItemInvoiceSvg from "assets/icons/ItemInvoiceSvg";
import NeedsSvg from "assets/icons/NeedsSvg";
import OrdersSvg from "assets/icons/OrdersSvg";
import UsersSvg from "assets/icons/UsersSvg";
import ItemsSvg from "assets/icons/itemsSvg";
import AccountantInvoice from "pages/AccountantInvoice";
import AccountantReport from "pages/AccountantReport";
import Buildings from "pages/Buildings";
import ItemInvoice from "pages/ItemInvoice";
import Items from "pages/Items";
import Needs from "pages/Needs";
import Orders from "pages/Orders";
import Users from "pages/Users";
import { useTranslation } from "react-i18next";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Dashboard from "views/dashboard";

function useRoutes() {
  const { t } = useTranslation();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;

  const routes = [];

  const navigate = useNavigate();
  if (!usr) navigate("/Login");

  if (role === "sales") {
    routes.push({
      name: t("sidebarLinks.buildings"),
      path: "/buildings",
      icon: <BuildingsSvg />,
      component: <Buildings />,
    });
  }

  if (role === "engineer" || role === "officer_eng") {
    routes.push(
      {
        name: t("sidebarLinks.items"),
        path: "/items",
        icon: <ItemsSvg />,
        component: <Items />,
      },
      {
        name: t("sidebarLinks.needs"),
        path: "/needs",
        icon: <NeedsSvg />,
        component: <Needs />,
      },
      {
        name: t("sidebarLinks.orders"),
        path: "/orders",
        icon: <OrdersSvg />,
        component: <Orders />,
      }
    );
  }

  if (role === "accountant") {
    routes.push({
      name: t("sidebarLinks.orders"),
      path: "/orders",
      icon: <OrdersSvg />,
      component: <Orders />,
    });
    routes.push({
      name: t("sidebarLinks.users"),
      path: "/users",
      icon: <UsersSvg />,
      component: <Users />,
    });
  }

  if (role === "admin" || role === "only_read") {
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
      },
      {
        name: t("sidebarLinks.needs"),
        path: "/needs",
        icon: <NeedsSvg />,
        component: <Needs />,
      },
      {
        name: t("sidebarLinks.users"),
        path: "/users",
        icon: <UsersSvg />,
        component: <Users />,
      }
    );
  }

  if (role === "admin") {
    routes.push({
      name: t("sidebarLinks.itemInvoice"),
      path: "/item-invoice",
      icon: <ItemInvoiceSvg />,
      component: <ItemInvoice />,
    });
  }

  if (role === "admin" || role === "accountant") {
    routes.push({
      name: t("sidebarLinks.accountantInvoice"),
      path: "/accountant-invoice",
      icon: <ItemInvoiceSvg />,
      component: <AccountantInvoice />,
    });
  }

  if (role === "admin") {
    routes.push({
      name: t("sidebarLinks.invoiceReport"),
      path: "/accountant-invoice-report",
      icon: <HiOutlineDocumentReport />,
      component: <AccountantReport />,
    });
  }

  return { routes };
}

export default useRoutes;
