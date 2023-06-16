

import  buildingsData  from "./variables/buildingsData.json";
import BuildingsTable from "./components/BuildingsTable"; 
import useBuildingsTableColumns from "./variables/useBuildingsTableColumns";
import Widget from "components/widget/widget"
import { MdBarChart, MdOutlineApartment } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsFillBuildingsFill } from "react-icons/bs";

const BuildingDashbaord = () => {

const {buildingsTableColumns} = useBuildingsTableColumns()
const {t} = useTranslation()

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
            tableData={buildingsData}
          />
        </div>
      </div>
    </div>
  );
};

export default BuildingDashbaord;