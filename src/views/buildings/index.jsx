import BuildingsTable from "./components/BuildingsTable";
import useBuildingsTableColumns from "./variables/useBuildingsTableColumns";
import Widget from "components/widget/widget";
import { useTranslation } from "react-i18next";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const BuildingDashboard = () => {
  const [newItem, setNewItem] = useState("");

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [BlockData, setBlockData] = useState([]);
  const { buildingsTableColumns } = useBuildingsTableColumns();
  const { t } = useTranslation();
  const API = "https://api.hirari-iq.com/api/blocks";

  useEffect(() => {
    fetchData();
  }, [newItem]);
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchData = () => {
    axios
      .get(API, config)
      .then((response) => {
        let arrayNotDeleted = [];
        response.data.data.map((item) => {
          if (item.is_deleted !== 1) {
            arrayNotDeleted.push(item);
          }
        });

        setBlockData(arrayNotDeleted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<BsFillBuildingsFill className="h-5 w-5" />}
          title={t("widgets.numberOfBuildings")}
          subtitle={BlockData.length}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <BuildingsTable
            columnsData={buildingsTableColumns}
            tableData={BlockData}
            GetNewItem={GetNewItem}
          />
        </div>
      </div>
    </div>
  );
};
export default BuildingDashboard;