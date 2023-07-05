import React, { useMemo } from "react";
import Card from "components/card";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import NewBuilding from "./NewBuilding";
import { Link } from "react-router-dom";
import { useSearchStore, useLanguageStore } from "App";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";

const BuildingsTable = (props) => {
  const { columnsData, tableData, GetNewItem } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const searchText = useSearchStore((state) => state.searchText);

  const filteredData = useMemo(
    () =>
      tableData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
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

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function deleteMe(e) {
    Swal.fire({
      title: t("alerts.buildings.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("alerts.buildings.deleteAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.buildings.deleteAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://api.hirari-iq.com/api/blocks/${e.target.getAttribute(
              "value"
            )}`,
            
            config
          )
          .then((response) => {
            GetNewItem(Math.random());
            Swal.fire(
              t("alerts.buildings.deleteAlerts.success.title"),
              t("alerts.buildings.deleteAlerts.success.message"),
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.buildings.deleteAlerts.error.title"),
              t("alerts.buildings.deleteAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("buildingsTable.title")}
        </div>
        <NewBuilding GetNewItem={GetNewItem} />
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
                      className={`border-b border-gray-200 pb-[10px] text-start  dark:!border-navy-700 ${
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
              if (row.original.is_deleted !== "1") {
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (
                        cell.column.id === "name" ||
                        cell.column.id === "number_of_floor" ||
                        cell.column.id === "apartment_per_floor" ||
                        cell.column.id === "description"
                      ) {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.id === "level") {
                        data = (
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}%
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
                              to={`/buildings/update/${row.original.id}`}
                              className="flex items-center gap-1 text-green-600"
                            >
                              <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg">
                                <FiEdit />
                              </div>
                              <p className="text-start text-sm font-medium text-black dark:text-white">
                                {t("actions.update")}
                              </p>
                            </Link>
                            <Link
                              to={`apartments/${row.original.id}`}
                              className="flex items-center gap-1 text-blue-600"
                            >
                              <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg">
                                <FiExternalLink />
                              </div>
                              <p className="text-start text-sm font-medium text-black dark:text-white">
                                {t("actions.apartments")}
                              </p>
                            </Link>
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
        </table>
      </div>
    </Card>
  );
};

export default BuildingsTable;