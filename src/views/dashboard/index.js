import axios from "axios";
import Widget from "components/widget/widget";
import { useEffect, useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { BsFillBuildingsFill } from "react-icons/bs";
import { SiMaterialdesignicons } from "react-icons/si";
import { GiCrane } from "react-icons/gi";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const API = "https://api.hirari-iq.com/api/dashboard/counts";

  useEffect(() => {
    axios
      .get(API, config)
      .then((data) => {
        const modifiedData = Object.entries(data.data.total_list_numbers).map(
          ([key, value]) => {
            let title = "";
            let icon = null;

            switch (key) {
              case "total_blocks":
                title = "Total Buildings";
                icon = <BsFillBuildingsFill />;
                break;
              case "total_needs":
                title = "Total Needs";
                icon = <SiMaterialdesignicons />;
                break;
              case "total_items":
                title = "Total Items";
                icon = <GoPackage />;
                break;
              case "total_orders":
                title = "Total Orders";
                icon = <GiCrane />;
                break;
              case "total_users":
                title = "Total Users";
                icon = <FaUserFriends />;
                break;
              default:
                title = "";
                icon = null;
            }

            return {
              id: crypto.randomUUID(),
              title,
              subtitle: value,
              icon,
            };
          }
        );

        console.log(modifiedData);

        setDashboardData(modifiedData);
      })
      .catch((err) => console.log(err));
  }, [config]);

  return (
    <div className="mx-auto max-w-[2000px]">
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {dashboardData &&
          dashboardData.map((data) => {
            return (
              <Widget
                icon={data.icon}
                title={data.title}
                subtitle={data.subtitle}
                key={data.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Dashboard;