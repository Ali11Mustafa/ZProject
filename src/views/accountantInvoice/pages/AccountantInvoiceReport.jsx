import { useLanguageStore } from "App";
import axios from "axios";
import Card from "components/card";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../components/InvoiceTable";
import useAccountantInvoicesTableColumns from "../variables/useAccountantInvoicesTableColumns";

function AccountantInvoiceReport() {
  //report

  const { register, handleSubmit, reset } = useForm();

  const [filterApplied, setFilterApplied] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [reportTotal, setReportTotal] = useState(0);
  const [reportCurrentPage, setReportCurrentPage] = useState(0);
  const [reportPerPage, setReportPerPage] = useState(0);
  const [reportPageNumber, setReportPageNumber] = useState(1);
  const [query, setQuery] = useState(null);

  function onFilterSubmit(data) {
    const queryData = {
      from: data["from-date"],
      to: data["to-date"],
      invoice_type: data["invoice-type"],
      per_page: data["per-page"],
      page: 1,
    };
    console.log(queryData);
    setQuery(queryData);
  }

  async function getAccountantInvoiceReport(queries) {
    try {
      const API = `https://api.hirari-iq.com/api/invoice/report/accountant?from=${queries.from}&to=${queries.to}&invoice_type=${queries.invoice_type}&per_page=${queries.per_page}&page=${queries.page}`;
      console.log(API);
      const response = await axios.get(API);
      console.log("report", response);

      const total = response.data.outgoing_count_invoice;
      const perPage = parseInt(response.data.per_page);
      const currentPage = 1;

      setReportTotal(total);
      setReportCurrentPage(currentPage);
      setReportPerPage(perPage);

      const startIndex = (currentPage - 1) * perPage;
      const endIndex = Math.min(startIndex + perPage, total);
      const invoices = response.data.invoice_query.slice(startIndex, endIndex);

      let arrayNotDeleted = [];
      invoices.map((item) => {
        if (item.is_deleted !== 1) {
          arrayNotDeleted.push(item);
        }
      });

      setReportData(arrayNotDeleted);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (
      query?.from &&
      query?.to &&
      query?.invoice_type &&
      query?.per_page &&
      query?.page
    ) {
      setFilterApplied(true);
      setShowFilter(false);
      getAccountantInvoiceReport({ ...query, page: reportPageNumber });
    }
  }, [query, reportPageNumber]);

  const HandleReportFetch = (pageNumber) => {
    setReportPageNumber(pageNumber);
  };

  function resetFilter() {
    setShowFilter(false);
    setFilterApplied(false);
    reset();
  }

  const language = useLanguageStore((state) => state.language);

  const [showFilter, setShowFilter] = useState(false);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;

  const { accountantInvoicesTableColumns } =
    useAccountantInvoicesTableColumns();
  const { t } = useTranslation();

  const navigate = useNavigate();

  if (role !== "admin") {
    navigate(-1);
  }
  return (
    <Card extra={"w-full h-full px-5 mt-7"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("accountantInvoiceTable.title")}
        </div>
        {role === "admin" && (
          <div className="relative flex items-center gap-10 ">
            <button
              className="text-xl"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter
                className={`${filterApplied ? "text-green-300" : ""}`}
              />
            </button>
            <form
              className={`${showFilter ? "" : "hidden"} absolute top-0 ${
                language === "en" ? "right-28" : "left-28"
              } flex w-[400px] flex-col gap-4 rounded-md border bg-white p-4 shadow-lg dark:border-none dark:bg-myBlak`}
              onSubmit={handleSubmit(onFilterSubmit)}
            >
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="from-date" className="text-right">
                  From Date:
                </label>
                <input
                  type="date"
                  id="from-date"
                  required
                  className="rounded px-2 py-1 dark:bg-black"
                  {...register("from-date")}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="to-date" className="text-right">
                  To Date:
                </label>
                <input
                  type="date"
                  id="to-date"
                  required
                  className="rounded px-2 py-1 dark:bg-black"
                  {...register("to-date")}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="invoice-type" className="text-right">
                  Invoice Type:
                </label>
                <select
                  className="rounded px-2 py-1 dark:bg-black"
                  id="invoice-type"
                  required
                  {...register("invoice-type")}
                >
                  <option>Choose a type</option>
                  <option value="outgoing">Outgoing</option>
                  <option value="income">Income</option>
                  <option value="salary">Salary</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="per-page" className="text-right">
                  Per Page:
                </label>
                <select
                  className="rounded px-2 py-1 dark:bg-black"
                  id="per-page"
                  required
                  defaultValue={10}
                  {...register("per-page")}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              {/* <div className="flex items-center justify-between gap-2">
            <label htmlFor="page" className="text-right">
              Page:
            </label>
            <input
              type="number"
              id="page"
              className="w-[80px] rounded px-2 py-1 dark:bg-black"
              required
              {...register("page")}
            />
          </div> */}
              <button
                type="submit"
                className=" rounded-lg bg-myPrimary px-5 py-2.5 text-sm font-medium text-white hover:bg-mySecondary focus:outline-none focus:ring-4  "
              >
                Filter
              </button>
              <button
                type="button"
                className=" rounded-lg bg-myCard px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={resetFilter}
              >
                Reset
              </button>
            </form>
          </div>
        )}
      </header>

      {!filterApplied ? (
        <p className="my-10 p-4 text-center">No Reports to show!</p>
      ) : (
        <InvoiceTable
          columnsData={accountantInvoicesTableColumns}
          tableData={reportData}
          total={reportTotal}
          currentPage={reportCurrentPage}
          HandleFetch={HandleReportFetch}
          perPage={reportPerPage}
        />
      )}
    </Card>
  );
}

export default AccountantInvoiceReport;
