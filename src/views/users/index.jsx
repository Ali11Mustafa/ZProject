import { useEffect, useState } from "react";
import ItemsTable from "./components/UserTable";
import useItemsTableColumns from "./variables/useItemsTableColumns";
import { useItemsStore } from "App";
import axios from "axios";

const ItemsDashboard = () => {
  const { itemsTableColumns } = useItemsTableColumns();
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [Data, setData] = useState([]);

  useEffect(() => {
    const storedCurrentPage = currentPage;
    FetchData(storedCurrentPage);
  }, [newItem, currentPage]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const FetchData = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/users?page=${pageNumber}`;
    axios
      .get(API, config)
      .then((response) => {
        console.log(response.data.data);
        setTotal(response.data.meta.total);
        setCurrentPage(pageNumber);
        setPerPage(response.data.meta.per_page);
        let arrayNotDeleted = [];
        response.data.data.map((item) => {
          arrayNotDeleted.push(item);
        });

        setData(arrayNotDeleted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HandleFetch = (pageNumber) => {
    FetchData(pageNumber);
  };

  const setItemNames = useItemsStore((state) => state.setItemNames);
  const setItemTypes = useItemsStore((state) => state.setItemTypes);

  //get ite Names
  useEffect(() => {
    if (Data) {
      const names = [];
      const types = [];

      Data.map((item) => {
        if (item.is_deleted !== 1) {
          names.push(item.name);
          types.push(item.type);
        }
      });

      setItemNames(names);
      setItemTypes(types);
    }
  }, [[Data, setItemNames, setItemTypes]]);

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <ItemsTable
            columnsData={itemsTableColumns}
            tableData={Data}
            GetNewItem={GetNewItem}
            setPageNumber={setPageNumber}
            total={total}
            pageNumber={pageNumber}
            currentPage={currentPage}
            perPage={perPage}
            HandleFetch={HandleFetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemsDashboard;