import axios from "axios";
import { useEffect, useState } from "react";
import InvoicesTable from "./components/InvoicesTable";
import useInvoicesTableColumns from "./variables/useInvoicesTableColumns";

const InvoicesDashbaord = () => {
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [invoices, setInvoices] = useState([]);
  const { invoicesTableColumns } = useInvoicesTableColumns();

  useEffect(() => {
    const storedCurrentPage = currentPage;
    fetchInvoices(storedCurrentPage);
  }, [newItem, currentPage]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchInvoices = (pageNumber = 1) => {
    const API = `https://api.hirari-iq.com/api/invoice/item?page=${pageNumber}`;
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

        setInvoices(arrayNotDeleted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HandleFetch = (pageNumber) => {
    fetchInvoices(pageNumber);
  };

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <InvoicesTable
            columnsData={invoicesTableColumns}
            tableData={invoices}
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
export default InvoicesDashbaord;
