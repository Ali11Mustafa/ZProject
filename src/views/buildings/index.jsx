import BuildingsTable from "./components/BuildingsTable";
import useBuildingsTableColumns from "./variables/useBuildingsTableColumns";
import Widget from "components/widget/widget";
import { MdBarChart, MdOutlineApartment } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const updateBlock = (BlockId, deleted, data) => {
  const API = `https://api.hirari-iq.com/api/blocks/${BlockId}`;
  axios
    .put(API, { ...data, is_deleted: deleted })
    .then((response) => {
      // Handle the response if needed
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const BuildingDashboard = () => {
  const [BlockData, setBlockData] = useState([]);
  const { buildingsTableColumns } = useBuildingsTableColumns();
  const { t } = useTranslation();
  const API = "https://api.hirari-iq.com/api/blocks";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData=()=>{
    axios.get(API)
  .then(response => {

    let arrayNotDeleted = []
    response.data.data.map((item)=>{
      if(item.is_deleted!==1){
        arrayNotDeleted.push(item);
      }

    })
    
  setBlockData(arrayNotDeleted);

  })
  .catch(error => {
    console.error(error);
  });
  }

  const onDeleteBuilding = (BlockId) => {
    const API = `https://api.hirari-iq.com/api/blocks/${BlockId}`;
    axios
      .delete(API)
      .then((response) => {
        // Handle the response if needed
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
          subtitle={3}
        />
        <Widget
          icon={<MdOutlineApartment className="h-6 w-6" />}
          title={t("widgets.numberOfApartments")}
          subtitle={6}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <BuildingsTable
            columnsData={buildingsTableColumns}
            tableData={BlockData}
            OnDeleteBuilding={onDeleteBuilding}
            OnUpdateBlock={updateBlock}
          />
        </div>
      </div>
    </div>
  );
};
export {updateBlock}
export default BuildingDashboard;
