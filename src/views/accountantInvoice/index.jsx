import axios from "axios";
import { useEffect, useState } from "react";
import { default as AccountantInvoicesTable } from "./components/accountantInvoiceTable";
import useAccountantInvoicesTableColumns from "./variables/useAccountantInvoicesTableColumns";

const AccountantInvoicesDashbaord = () => {
  const [newItem, setNewItem] = useState("");
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemInvoices, setItemInvoices] = useState([]);

  const GetNewItem = (item) => {
    setNewItem(item);
    //Math.random
  };

  const [invoices, setInvoices] = useState([]);
  const { accountantInvoicesTableColumns } =
    useAccountantInvoicesTableColumns();

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
    const API = `https://api.hirari-iq.com/api/invoice/accountant?page=${pageNumber}`;
    axios
      .get(API, config)
      .then((response) => {
        console.log("index", response);
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
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    getAccountantInvoices();
  }, []);

  async function getAccountantInvoices() {
    const API = "https://api.hirari-iq.com/api/invoice/item";
    try {
      let res = await axios(API, config);
      let itemInvoices = res.data.data;
      itemInvoices.forEach((itemInvoice) => {
        setItemInvoices((prev) => [
          ...prev,
          {
            invoice_item_id: itemInvoice.id,
            invoice_item_name: itemInvoice.invoice_item_name,
          },
        ]);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <AccountantInvoicesTable
            columnsData={accountantInvoicesTableColumns}
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
export default AccountantInvoicesDashbaord;
