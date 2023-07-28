import { useState, useEffect } from "react";
import axios from "axios";
import NeedsTable from "./components/NeedsTable";
import useNeedsTableColumns from "./variables/useNeedsTableColumns";

const NeedsDashboard = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const GetNewItem = (item) => {
    setNewItem(item);
  };

  const { needsTableColumns } = useNeedsTableColumns();

  useEffect(() => {
    const storedCurrentPage = currentPage;
    fetchData(storedCurrentPage);
  }, [newItem, currentPage]);

  const fetchData = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/needs?page=${pageNumber}`;
    setLoading(true);
    axios
      .get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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
        setLoading(false);
        setNeeds(arrayNotDeleted);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const HandleFetch = (pageNumber) => {
    fetchData(pageNumber);
  };

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <NeedsTable
            columnsData={needsTableColumns}
            tableData={needs}
            GetNewItem={GetNewItem}
            setPageNumber={setPageNumber}
            total={total}
            pageNumber={pageNumber}
            currentPage={currentPage}
            perPage={perPage}
            HandleFetch={HandleFetch}
            setCurrentPage={setCurrentPage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default NeedsDashboard;