

import  buildingsData  from "./variables/buildingsData.json";
import BuildingsTable from "./components/BuildingsTable"; 
import useBuildingsTableColumns from "./variables/useBuildingsTableColumns";

const BuildingDashbaord = () => {

const {buildingsTableColumns} = useBuildingsTableColumns()

  return (
    <div>
      
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
