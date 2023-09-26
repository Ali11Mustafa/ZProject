import axios from "axios";
import { useEffect, useState } from "react";
import OrdersTable from "./components/OrdersTable";
import useItemsTableColumns from "./variables/useItemsTableColumns";

const OrdersDashboard = () => {
  const { itemsTableColumns } = useItemsTableColumns();
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [orders, setOrders] = useState([]);
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
    const API = `https://api.hirari-iq.com/api/orders?page=${pageNumber}`;
    setLoading(true);
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
        setLoading(false);
        setOrders(arrayNotDeleted);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  const HandleFetch = (pageNumber) => {
    FetchData(pageNumber);
  };

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <OrdersTable
            columnsData={itemsTableColumns}
            tableData={orders}
            GetNewItem={GetNewItem}
            setPageNumber={setPageNumber}
            total={total}
            pageNumber={pageNumber}
            currentPage={currentPage}
            perPage={perPage}
            HandleFetch={HandleFetch}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
