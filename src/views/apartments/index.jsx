import ApartmentsTable from "./components/ApartmentsTable";
import apartmentsData from "./variables/apartmentsData.json";
import { useParams } from "react-router-dom";
import useApartmentsTableColumns from "./variables/useApartmentsTableColumns";

const ApartmentsDashbaord = () => {
  const { apartmentsTableColumns } = useApartmentsTableColumns();

  // const { buildingId } = useParams();

  // const apartments = apartmentsData.filter(
  //   (apartment) => apartment.building_id === buildingId
  // );

  const mockData = [
    {
      owner_name: "Ali mustafa",
      phone_number: "000120012",
      contract_date: "9/2/2023",
      apartment_number: "E2-1",
      total: "39,000$",
      apartment_price: "70,000$",
      remaining_money: "20,900$",
    },
  ];

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