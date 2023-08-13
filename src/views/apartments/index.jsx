import ApartmentsTable from "./components/ApartmentsTable";
import apartmentsData from "./variables/apartmentsData.json";
import { useParams } from "react-router-dom";
import useApartmentsTableColumns from "./variables/useApartmentsTableColumns";
import { usePdfStore } from "App";
import { useEffect } from "react";

const ApartmentsDashbaord = () => {
  const { apartmentsTableColumns } = useApartmentsTableColumns();

  // const { buildingId } = useParams();

  // const apartments = apartmentsData.filter(
  //   (apartment) => apartment.building_id === buildingId
  // );

  const pdfStore = usePdfStore();
  const mockData = [
    {
      apartment_number: "A102",
      building: "ZA1",
      description: "some text about the apartment",
      floor: "12",
      status: "sold",
      area: "1000",
    },
  ];

  // Update pdfStore values directly
  useEffect(() => {
    const data = mockData[0]; // Assuming you have only one data entry in mockData
    pdfStore.setBuilding(data.building);
    pdfStore.setApartmentNumber(data.apartment_number); // Corrected property name
    pdfStore.setArea(data.area);
    pdfStore.setFloor(data.floor);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <ApartmentsTable
            columnsData={apartmentsTableColumns}
            tableData={mockData}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentsDashbaord;
