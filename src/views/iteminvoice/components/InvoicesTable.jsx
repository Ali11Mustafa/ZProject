import { useLanguageStore, useSearchStore } from "App";
import axios from "axios";
import Spinner from "components/Spinner";
import Card from "components/card";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import Swal from "sweetalert2";
import NewInvoice from "./NewInvoice";

const InvoicesTable = (props) => {
  const {
    columnsData,
    tableData,
    GetNewItem,
    total,
    currentPage,
    HandleFetch,
    perPage,
    loading,
  } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const searchText = useSearchStore((state) => state.searchText);

  const filteredData = useMemo(
    () =>
      tableData.filter((item) =>
        item.invoice_item_name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [tableData, searchText]
  );

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;

  initialState.pageSize = 11;

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  let role = usr?.role;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function deleteMe(e) {
    Swal.fire({
      title: t("alerts.itemInvoice.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("alerts.itemInvoice.deleteAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.itemInvoice.deleteAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://api.hirari-iq.com/api/invoice/item/${e.target.getAttribute(
              "value"
            )}`,

            config
          )
          .then((response) => {
            GetNewItem(Math.random());
            Swal.fire(
              t("alerts.itemInvoice.deleteAlerts.success.title"),
              t("alerts.itemInvoice.deleteAlerts.success.message"),
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.itemInvoice.deleteAlerts.error.title"),
              t("alerts.itemInvoice.deleteAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  const handlePageclick = (data) => {
    HandleFetch(data.selected + 1);
  };
  const showNextButton = currentPage !== total - 1;
  const showPrevButton = currentPage !== 1 || currentPage !== 0;

  return (
    <Card extra={"w-full h-full px-5 mt-7"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("itemInvoiceTable.title")}
        </div>
        <div>
          <NewInvoice GetNewItem={GetNewItem} />
        </div>
      </header>

      <div
        className={`mt-8  ${
          tableData.length > 0 ? "overflow-scroll" : "overflow-hidden"
        }`}
      >
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    className={`border-b !border-gray-300 pb-[10px] text-start  dark:!border-gray-700 ${
                      language !== "en"
                        ? "lg:pl-auto pl-[40px] text-right"
                        : "lg:pr-auto pr-[40px]"
                    }`}
                    key={index}
                  >
                    <div className="text-xs font-medium tracking-wide text-gray-600 lg:text-[14px]">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? (
            <Spinner />
          ) : tableData.length > 0 ? (
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                if (row.original.is_deleted !== "1") {
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.id === "invoice_item_name") {
                          data = (
                            <p
                              className="w-[100px] truncate text-sm font-medium text-black dark:text-white"
                              title={cell.value}
                            >
                              {cell.value}
                            </p>
                          );
                        } else if (
                          cell.column.id === "invoice_item_need_status"
                        ) {
                          data = (
                            <p className="w-[100px] truncate text-sm font-medium text-black dark:text-white">
                              {cell.value}
                            </p>
                          );
                        } else if (cell.column.id === "actions") {
                          data = (
                            <div className="flex items-center gap-4">
                              {role === "admin" && (
                                <>
                                  <button
                                    value={row.original.id}
                                    onClick={deleteMe}
                                    className="flex items-center gap-1 text-red-600"
                                  >
                                    <div
                                      value={row.original.id}
                                      className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-xl "
                                    >
                                      <MdDeleteOutline
                                        value={row.original.id}
                                      />
                                    </div>
                                    <p
                                      value={row.original.id}
                                      className="text-start text-sm font-medium text-black dark:text-white"
                                    >
                                      {t("actions.delete")}
                                    </p>
                                  </button>
                                  <Link
                                    to={`/item-invoice/update/${row.original.id}`}
                                    className="flex items-center gap-1 text-green-600"
                                  >
                                    <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg">
                                      <FiEdit />
                                    </div>
                                    <p className="text-start text-sm font-medium text-black dark:text-white">
                                      {t("actions.update")}
                                    </p>
                                  </Link>
                                </>
                              )}
                            </div>
                          );
                        }

                        return (
                          <td
                            {...cell.getCellProps()}
                            key={index}
                            className="pt-[14px] pb-[16px]"
                          >
                            {data}
                          </td>
                        );
                      })}
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          ) : (
            <p className="mx-center"></p>
          )}
        </table>
      </div>
      {total > perPage && (
        <ReactPaginate
          breakLabel={<span className="mx-2">...</span>}
          nextLabel={
            showNextButton ? (
              <button className="text-md mx-2 flex h-10 w-10 items-center justify-center rounded-md bg-mySecondary text-center text-white hover:bg-myPrimary">
                {language === "en" ? <BsChevronRight /> : <BsChevronLeft />}
              </button>
            ) : null
          }
          onPageChange={handlePageclick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(total / 10)}
          previousLabel={
            showPrevButton ? (
              <button className="text-md mx-2 flex h-10 w-10 items-center justify-center rounded-md bg-mySecondary text-center text-white hover:bg-myPrimary">
                {language === "en" ? <BsChevronLeft /> : <BsChevronRight />}
              </button>
            ) : null
          }
          containerClassName="flex items-center justify-center mt-8 mb-4"
          pageClassName="flex w-full h-full border-solid  items-center justify-center hover:bg-myPrimary rounded-md mx-2 "
          pageLinkClassName="h-10 w-full mr-4 flex items-center justify-center"
          activeClassName="bg-myPrimary text-white"
        />
      )}
    </Card>
  );
};

export default InvoicesTable;
