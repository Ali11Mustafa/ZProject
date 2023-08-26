import { useUserConfigStore } from "App";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApartmentsTable from "./components/ApartmentsTable";
import useApartmentsTableColumns from "./variables/useApartmentsTableColumns";

const ApartmentsDashbaord = () => {
  const { apartmentsTableColumns } = useApartmentsTableColumns();

  const { buildingId } = useParams();
  const userConfig = useUserConfigStore((state) => state.userConfig);
  // let usr = JSON.parse(sessionStorage.getItem("user"));
  // let token = usr?.token;

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

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
  }, [newItem, currentPage, buildingId]);

  const fetchData = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/apartments/${buildingId}?page=${pageNumber}`;
    axios
      .get(API, userConfig)
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
