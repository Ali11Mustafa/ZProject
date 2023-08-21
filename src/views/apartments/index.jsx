import ApartmentsTable from "./components/ApartmentsTable";
import { useParams } from "react-router-dom";
import useApartmentsTableColumns from "./variables/useApartmentsTableColumns";
import { usePdfStore } from "App";
import { useEffect, useState } from "react";
import axios from "axios";
import { useBuildingData } from "App";
import { useMemo } from "react";

const ApartmentsDashbaord = () => {
  const { apartmentsTableColumns } = useApartmentsTableColumns();

  const { buildingId } = useParams();

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [apartmentsData, setApartmentsData] = useState([]);
  const [newItem, setNewItem] = useState("");

  const GetNewItem = (item) => {
    setNewItem(item);
  };

  useEffect(() => {
    const storedCurrentPage = currentPage;
    fetchData(storedCurrentPage);
  }, [newItem, currentPage]);

  const fetchData = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/apartments/${buildingId}?page=${pageNumber}`;
    axios
      .get(API, config)
      .then((response) => {
        setTotal(response.data.meta.total);
        setCurrentPage(pageNumber);
        setPerPage(response.data.meta.per_page);

        let arrayNotDeleted = [];
        response.data.data.map((item) => {
          if (item.is_deleted !== 1) {
            arrayNotDeleted.push(item);
          }
        });

        setApartmentsData(arrayNotDeleted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HandleFetch = (pageNumber) => {
    fetchData(pageNumber);
  };

  const { setBuildingName } = usePdfStore();
  const [buildingNameFromApi, setBuildingNameFromApi] = useState("");
  const memoizedBuildingName = useMemo(
    () => ({
      buildingNameFromApi,
    }),
    [buildingNameFromApi]
  );

  useEffect(() => {
    const API = `https://api.hirari-iq.com/api/blocks`;
    axios
      .get(API, config)
      .then((response) => {
        const currentBuilding = response.data.data.filter(
          (block) => block.id === buildingId
        );
        setBuildingNameFromApi(currentBuilding[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [buildingId]);

  useEffect(() => {
    setBuildingName(memoizedBuildingName.buildingNameFromApi);
  }, [buildingNameFromApi]);

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <ApartmentsTable
            columnsData={apartmentsTableColumns}
            tableData={apartmentsData}
            setPageNumber={setPageNumber}
            total={total}
            pageNumber={pageNumber}
            currentPage={currentPage}
            perPage={perPage}
            HandleFetch={HandleFetch}
            setCurrentPage={setCurrentPage}
            GetNewItem={GetNewItem}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentsDashbaord;
