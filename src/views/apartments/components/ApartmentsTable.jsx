import React, { useEffect, useMemo } from "react";
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaEye, FaFileContract } from "react-icons/fa";
import NewApartment from "./NewApartment";
import { Link, useParams } from "react-router-dom";
import { useSearchStore } from "App";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";
import axios from "axios";
import { usePdfStore } from "App";

const ApartmentsTable = (props) => {
  const resetSearchText = useSearchStore((state) => state.resetSearchText);
  const searchText = useSearchStore((state) => state.searchText);

  useEffect(() => {
    resetSearchText();
  }, [resetSearchText]);

  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);

  // const filteredData = useMemo(
  //   () =>
  //     tableData.filter((item) =>
  //       item.name.toLowerCase().includes(searchText.toLowerCase())
  //     ),
  //   [tableData, searchText]
  // );

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
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

  function handleDelete(rowId) {}

  function handleUpdate(rowId) {}

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);

  const apartmentId = 1;
  const { buildingId } = useParams();

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("apartmentsTable.title")}
        </div>

        <NewApartment />
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
              console.log(row.original);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.id === "apartment_number") {
                      // pdfStore.setApartmentNumber(cell.value);
                      data = (
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.id === "building") {
                      // pdfStore.setBuilding(cell.value);
                      data = (
                        <div className="flex items-center">
                          <Link
                            to="#"
                            className="text-sm font-medium text-black dark:text-white"
                          >
                            {cell.value}
                          </Link>
                        </div>
                      );
                    } else if (cell.column.id === "floor") {
                      // pdfStore.setFloor(cell.value);
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "area") {
                      // pdfStore.setArea(cell.value);
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "description") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "status") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "actions") {
                      data = (
                        <div className="flex items-center gap-4">
                          <button
                            className="flex items-center gap-1 text-red-600"
                            onClick={() => handleDelete(row.id)}
                          >
                            <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-xl ">
                              <MdDeleteOutline />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.delete")}
                            </p>
                          </button>
                          <button
                            className="flex items-center gap-1 text-green-600"
                            onClick={() => handleUpdate(row.original.id)}
                          >
                            <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg ">
                              <FiEdit />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.update")}
                            </p>
                          </button>
                          <Link
                            to={`/buildings/${buildingId}/apartments/${apartmentId}/details`}
                            className="flex items-center gap-1 text-green-600"
                          >
                            <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-lg ">
                              <FaEye />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.view")}
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

export default ApartmentsTable;
