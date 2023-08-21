import BuildingsTable from "./components/BuildingsTable";
import useBuildingsTableColumns from "./variables/useBuildingsTableColumns";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axios from "axios";

const updateBlock = (BlockId, deleted, data) => {
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const API = `https://api.hirari-iq.com/api/blocks/${BlockId}`;
  axios
    .put(API, { ...data, is_deleted: deleted, config })
    .then((response) => {
      // Handle the response if needed
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const BuildingDashboard = () => {
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [BlockData, setBlockData] = useState([]);
  const { buildingsTableColumns } = useBuildingsTableColumns();

  useEffect(() => {
    const storedCurrentPage = currentPage;
    fetchData(storedCurrentPage);
  }, [newItem, currentPage]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchData = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/blocks?page=${pageNumber}`;
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

        setBlockData(arrayNotDeleted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteBuilding = (BlockId) => {
    let usr = JSON.parse(sessionStorage.getItem("user"));
    let token = usr?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const API = `https://api.hirari-iq.com/api/blocks/${BlockId}`;
    axios
      .delete(API, config)
      .then((response) => {
        // Handle the response if needed
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
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <BuildingsTable
            columnsData={buildingsTableColumns}
            tableData={BlockData}
            OnDeleteBuilding={onDeleteBuilding}
            OnUpdateBlock={updateBlock}
            GetNewItem={GetNewItem}
            setPageNumber={setPageNumber}
            total={total}
            pageNumber={pageNumber}
            currentPage={currentPage}
            perPage={perPage}
            HandleFetch={HandleFetch}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
export { updateBlock };
export default BuildingDashboard;
