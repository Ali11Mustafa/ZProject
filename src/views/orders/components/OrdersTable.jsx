import Card from "components/card";
import { useMemo, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import { useLanguageStore } from "App";
import axios from "axios";
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
import NewOrder from "./NewOrder";

const OrdersTable = (props) => {
  const {
    columnsData,
    tableData,
    GetNewItem,
    currentPage,
    perpage,
    setPageNumber,
    total,
    HandleFetch,
  } = props;
  const [pageIndex, setPageIndex] = useState(0);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let userName = usr?.fullname;
  let email = usr?.email;
  let role = usr?.role;
  let usrId = usr?.id;
  let token = usr?.token;

  console.log("ROLE", role);

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
      initialState: { pageIndex: pageIndex, pageSize: 10 },
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
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  //initialState.pageSize = 11;

  const { t } = useTranslation();

  function deleteMe(e) {
    console.log(e.target.getAttribute("value"));

    Swal.fire({
      title: t("alerts.delete.sure"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: t("alerts.delete.cancel"),
      confirmButtonText: t("alerts.delete.yes"),
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            t("alerts.delete.deleted"),
            t("alerts.delete.fileDeleted"),
            t("alerts.delete.success")
          );

          const res = axios
            .delete(
              `https://api.hirari-iq.com/api/orders/${e.target.getAttribute(
                "value"
              )}`,
              config
            )
            .then((response) => {
              // setDeleted(true);
              GetNewItem(Math.random());
              console.log(response);
            });
        }
      })
      //ssssssssss
      .catch((error) => {
        Swal.fire(
          t("deleteError.title"),
          t("deleteError.oops"),
          t("deleteError.failed")
        );
      });
  }
  function onAccept(e) {
    console.log(e.target.getAttribute("value"));

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: t("alerts.status.accept"),
      cancelButtonText: t("alerts.status.cancel"),
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            t("alerts.status.accepted"),
            t("alerts.status.title"),
            t("alerts.status.success")
          );

          const res = axios
            .put(
              `https://api.hirari-iq.com/api/orders/accept/${e.target.getAttribute(
                "value"
              )}}`,
              config
            )
            .then((response) => {
              // setDeleted(true);
              GetNewItem(Math.random());
              console.log(response);
            });
        }
      })
      .catch((error) => {
        Swal.fire(
          t("alerts.status.error.title"),
          t("alerts.status.error.oops"),
          t("alerts.status.error.failed")
        );
      });
  }
  const language = useLanguageStore((state) => state.language);
  const handlePageclick = (data) => {
    console.log("data", data.selected);
    HandleFetch(data.selected + 1);
  };
  const showNextButton = currentPage !== total - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("ordersTable.title")}
        </div>
        <NewOrder GetNewItem={GetNewItem} />
      </header>

      <div className="mt-8 overflow-x-scroll overflow-y-scroll xl:overflow-x-hidden">
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
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className={`border-b border-gray-200  pb-[10px] text-start  dark:!border-navy-700 ${
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
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.id === "amount") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "unit") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "price") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "status") {
                      if (cell.value === "accept") {
                        data = (
                          <p className="text-lg font-medium text-green-600 ">
                            {cell.value}
                          </p>
                        );
                      } else {
                        if (usr.role == "admin" || usr.role === "accountant") {
                          data =
                            cell.value !== "accept" ? (
                              <div className="flex items-center gap-2">
                                <button
                                  value={row.original.id}
                                  onClick={onAccept}
                                  className="rounded-md bg-green-400 px-2 py-1 dark:text-black"
                                >
                                  {t("alerts.status.accept")}
                                </button>
                                <button className="rounded-md bg-red-400 px-2 py-1 dark:text-black">
                                  {t("alerts.status.reject")}
                                </button>
                              </div>
                            ) : (
                              <p className="text-sm font-medium text-green-600 ">
                                {cell.value}
                              </p>
                            );
                        } else {
                          data = (
                            <p className="text-lg font-medium text-[#FFA500] ">
                              Pending
                            </p>
                          );
                        }
                      }
                    } else if (cell.column.id === "user_info.name") {
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
                    } else if (cell.column.id === "item_info.type") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "item_info.remaining_item") {
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
                            to={`/orders/update/${row.original.id}`}
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
        </table>
        <ReactPaginate
          breakLabel={<span className="mr-4">...</span>}
          nextLabel={
            showNextButton ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-lightGray">
                <BsChevronRight />
              </span>
            ) : null
          }
          onPageChange={handlePageclick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(total / 10)}
          previousLabel={
            showPrevButton ? (
              <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-lightGray">
                <BsChevronLeft />
              </span>
            ) : null
          }
          containerClassName="flex items-center justify-center mt-8 mb-4"
          pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
          activeClassName="bg-lightGrayy text-black"
        />
      </div>
    </Card>
  );
};

export default OrdersTable;