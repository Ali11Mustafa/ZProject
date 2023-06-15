

import ApartmentsTable from "./components/ApartmentsTable";
import apartmentsData from "./variables/apartmentsData.json";
import { useParams } from "react-router-dom";
import useApartmentsTableColumns from "./variables/useApartmentsTableColumns";

const ApartmentsDashbaord = () => {

  const {apartmentsTableColumns} = useApartmentsTableColumns()


  const {buildingId} = useParams()

  const apartments = apartmentsData.filter(apartment => apartment.building_id === buildingId);


  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <ApartmentsTable
            columnsData={apartmentsTableColumns}
            tableData={apartments}
          />
        </div>

        
      </div>
    </div>
  );
};

export default ApartmentsDashbaord;
