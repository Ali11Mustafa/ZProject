import axios from "axios";
import Widget from "components/widget/widget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaUserFriends } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { BsFillBuildingsFill } from "react-icons/bs";
import { SiMaterialdesignicons } from "react-icons/si";
import { GiCrane } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const API = "https://api.hirari-iq.com/api/dashboard/counts";

  const { t } = useTranslation();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(API, config)
      .then((data) => {
        const modifiedData = Object.entries(data.data.total_list_numbers).map(
          ([key, value]) => {
            let title = "";
            let icon = null;
            let path = "";

            switch (key) {
              case "total_blocks":
                title = t("dashboardPage.total_blocks");
                path = "/buildings";
                icon = <BsFillBuildingsFill />;
                break;
              case "total_needs":
                title = t("dashboardPage.total_needs");
                path = "/needs";
                icon = <SiMaterialdesignicons />;
                break;
              case "total_items":
                title = t("dashboardPage.total_items");
                path = "/items";
                icon = <GoPackage />;
                break;
              case "total_orders":
                title = t("dashboardPage.total_orders");
                path = "/orders";
                icon = <GiCrane />;
                break;
              case "total_users":
                title = t("dashboardPage.total_users");
                path = "/users";
                icon = <FaUserFriends />;
                break;
              default:
                title = "";
                path = "";
                icon = null;
            }

            return {
              id: crypto.randomUUID(),
              title,
              subtitle: value,
              icon,
              path,
            };
          }
        );
        setDashboardData(modifiedData);
      })
      .catch((err) => console.log(err));
  }, [t, token]);

  return (
    <div className="mx-auto max-w-[2000px]">
      {dashboardData.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {dashboardData.map((data) => {
            return (
              <Link to={data.path} key={data.id}>
                <Widget
                  icon={data.icon}
                  title={data.title}
                  subtitle={data.subtitle}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto my-5 w-fit">
          <div className="relative ">
            <svg
              className="h-12 w-12 animate-spin text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.75V6.25"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 6.87347L16.0659 7.93413"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.25 12L17.75 12"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1266 17.1265L16.0659 16.0659"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17.75V19.25"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 16.0659L6.87354 17.1265"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.25 12L4.75 12"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9342 7.93413L6.87354 6.87347"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;