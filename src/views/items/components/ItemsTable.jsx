import Card from "components/card";
import { useMemo } from "react";
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
import NewItem from "./NewItem";

const ItemsTable = (props) => {
  const { columnsData, tableData, GetNewItem } = props;

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

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);

  function deleteMe(e) {
    Swal.fire({
      title: t("alerts.items.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: t("alerts.items.deleteAlerts.cancelButtonText"),
      confirmButtonText: t("alerts.items.deleteAlerts.confirmButtonText"),
    })
      .then((result) => {
        if (result.isConfirmed) {
          let usr = JSON.parse(sessionStorage.getItem("user"));
          let token = usr?.token;

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios
            .delete(
              `https://api.hirari-iq.com/api/items/${e.target.getAttribute(
                "value"
              )}`,
              config
            )
            .then((response) => {
              GetNewItem(Math.random());
              Swal.fire(
                t("alerts.items.deleteAlerts.success.title"),
                t("alerts.items.deleteAlerts.success.message"),
                "success"
              );
            })
            .catch((error) => {
              Swal.fire(
                t("alerts.items.deleteAlerts.error.title"),
                t("alerts.items.deleteAlerts.error.message"),
                "error"
              );
            });
        }
      })

      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("itemsTable.title")}
        </div>
        <NewItem GetNewItem={GetNewItem} />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
                  ))}
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
                    if (cell.column.id === "name") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "remaining_item") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "type") {
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
                            to={`/items/update/${row.original.id}`}
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
      </div>
    </Card>
  );
};

export default ItemsTable;