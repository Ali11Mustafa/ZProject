import axios from "axios";
import Card from "components/card";
import { useMemo } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import { useLanguageStore } from "App";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import NewNeed from "./NewNeed";
import Spinner from "components/Spinner";

const NeedsTable = (props) => {
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

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const columns = useMemo(() => columnsData, [columnsData]);

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
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

  const language = useLanguageStore((state) => state.language);

  function onAccept(needId) {
    Swal.fire({
      title: t("alerts.needs.acceptAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#339cdd",
      confirmButtonText: t("alerts.needs.acceptAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.needs.acceptAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://api.hirari-iq.com/api/needs/accept/${needId}`,
            {},
            config
          )
          .then(() => {
            Swal.fire(
              t("alerts.needs.acceptAlerts.success.title"),
              t("alerts.needs.acceptAlerts.success.message"),
              "success"
            );
            GetNewItem(Math.random());
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.needs.acceptAlerts.error.title"),
              t("alerts.needs.acceptAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }
  function onReject(needId) {
    Swal.fire({
      title: t("alerts.needs.rejectAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#339cdd",
      confirmButtonText: t("alerts.needs.rejectAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.needs.rejectAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://api.hirari-iq.com/api/needs/reject/${needId}`,
            {},
            config
          )
          .then(() => {
            Swal.fire(
              t("alerts.needs.rejectAlerts.success.title"),
              t("alerts.needs.rejectAlerts.success.message"),
              "success"
            );
            GetNewItem(Math.random());
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.needs.rejectAlerts.error.title"),
              t("alerts.needs.rejectAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  function deleteMe(e) {
    Swal.fire({
      title: t("alerts.needs.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: t("alerts.needs.deleteAlerts.cancelButtonText"),
      confirmButtonText: t("alerts.needs.deleteAlerts.confirmButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://api.hirari-iq.com/api/needs/${e.target.getAttribute(
              "value"
            )}`,
            config
          )
          .then((response) => {
            Swal.fire(
              t("alerts.needs.deleteAlerts.success.title"),
              t("alerts.needs.deleteAlerts.success.message"),
              "success"
            );
            GetNewItem(Math.random());
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.needs.deleteAlerts.error.title"),
              t("alerts.needs.deleteAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  const { t } = useTranslation();

  const handlePageclick = (data) => {
    HandleFetch(data.selected + 1);
  };
  const showNextButton = currentPage !== total - 1;
  const showPrevButton = currentPage !== 1 || currentPage !== 0;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5 mt-10"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("needsTable.title")}
        </div>
        <NewNeed GetNewItem={GetNewItem} />
      </header>

      <div className="mt-8">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => {
              return (
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
                        {" "}
                        {column.render("Header")}
                      </div>
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          {loading ? ( // Check the loading state to show the spinner
            <Spinner />
          ) : data.length > 0 ? (
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";

                      if (cell.column.id === "need_amount") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "description") {
                        data = (
                          <p className="w-[100px] truncate text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "status") {
                        if (
                          cell.value === "accept" ||
                          cell.value === "reject"
                        ) {
                          if (cell.value === "accept") {
                            data = (
                              <p className="text-md font-medium text-green-600">
                                Accepted
                              </p>
                            );
                          } else if (cell.value === "reject") {
                            data = (
                              <p className="text-md font-medium text-red-600">
                                Rejected
                              </p>
                            );
                          }
                        } else if (
                          usr.role === "admin" ||
                          usr.role === "officer_eng"
                        ) {
                          data = (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onAccept(row.original.id)}
                                className="rounded-md bg-green-400 px-2 py-1 dark:text-black"
                              >
                                {t("alerts.needs.acceptAlerts.buttons.accept")}
                              </button>
                              <button
                                onClick={() => onReject(row.original.id)}
                                className="rounded-md bg-red-400 px-2 py-1 dark:text-black"
                              >
                                {t("alerts.needs.rejectAlerts.buttons.reject")}
                              </button>
                            </div>
                          );
                        } else {
                          data = (
                            <p className="text-lg font-medium text-[#FFA500]">
                              Pending
                            </p>
                          );
                        }
                      } else if (cell.column.id === "user_info.name") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (
                        cell.column.id === "item_info.remaining_item"
                      ) {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "item_info.type") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "item_info.name") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "block_info.name") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "actions") {
                        data = (
                          <div className="flex items-center gap-4">
                            <button
                              value={row.original.id}
                              onClick={deleteMe}
                              className="flex items-center gap-1 text-red-600"
                            >
                              <div
                                value={row.original.id}
                                className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-xl "
                              >
                                <MdDeleteOutline value={row.original.id} />
                              </div>
                              <p
                                value={row.original.id}
                                className="text-start text-sm font-medium text-black dark:text-white"
                              >
                                {t("actions.delete")}
                              </p>
                            </button>
                            <Link
                              to={`/needs/update/${row.original.id}`}
                              className="flex items-center gap-1 text-green-600"
                            >
                              <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg ">
                                <FiEdit />
                              </div>
                              <p className="text-start text-sm font-medium text-black dark:text-white">
                                {t("actions.update")}
                              </p>
                            </Link>
                          </div>
                        );
                      }

                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
                        >
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <p className="mx-center"></p>
          )}
        </table>
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
            pageLinkClassName="h-10 w-10 mr-4 flex items-center justify-center"
            activeClassName="bg-myPrimary text-white"
          />
        )}
      </div>
    </Card>
  );
};

export default NeedsTable;
