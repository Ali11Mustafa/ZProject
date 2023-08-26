import Card from "components/card";
import { useEffect, useMemo } from "react";

import { useLanguageStore, useSearchStore } from "App";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Swal from "sweetalert2";
import NewApartment from "./NewApartment";

const ApartmentsTable = (props) => {
  const resetSearchText = useSearchStore((state) => state.resetSearchText);
  const searchText = useSearchStore((state) => state.searchText);

  const navigate = useNavigate();
  function goback() {
    navigate(-1);
  }

  useEffect(() => {
    resetSearchText();
  }, [resetSearchText]);

  const {
    columnsData,
    tableData,
    total,
    currentPage,
    HandleFetch,
    perPage,
    GetNewItem,
  } = props;

  const columns = useMemo(() => columnsData, [columnsData]);

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

  function handleDelete(apartmentId) {
    Swal.fire({
      title: t("alerts.buildings.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("alerts.apartments.deleteAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.apartments.deleteAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://api.hirari-iq.com/api/apartments/${apartmentId}`,

            config
          )
          .then((response) => {
            GetNewItem(Math.random());
            Swal.fire(
              t("alerts.apartments.deleteAlerts.success.title"),
              t("alerts.apartments.deleteAlerts.success.message"),
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              t("alerts.apartments.deleteAlerts.error.title"),
              t("alerts.apartments.deleteAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);
  const { buildingId } = useParams();

  const handlePageclick = (data) => {
    HandleFetch(data.selected + 1);
  };
  const showNextButton = currentPage !== total - 1;
  const showPrevButton = currentPage !== 1 || currentPage !== 0;

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  let role = usr?.role;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function goBack() {
    navigate(-1);
  }

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5 mt-10 mt-10"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="text-lg text-black dark:text-white"
          >
            {language === "en" ? <BsArrowLeft /> : <BsArrowRight />}
          </button>
          <div className="text-xl font-semibold text-navy-700 dark:text-white">
            {t("apartmentsTable.title")}
          </div>
        </div>

        <NewApartment GetNewItem={GetNewItem} />
      </header>

      <div className="mt-8 overflow-scroll">
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
                    if (cell.column.id === "apartment_number") {
                      data = (
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.id === "building") {
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
                    } else if (cell.column.id === "floor_number") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.id === "area") {
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
                            onClick={() => handleDelete(row.original.id)}
                          >
                            <div className="flex items-center justify-center rounded-sm from-brandLinear to-brand-500 text-xl ">
                              <MdDeleteOutline />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.delete")}
                            </p>
                          </button>
                          <Link
                            to={`/buildings/${buildingId}/apartments/${row.original.id}/update`}
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
                            to={`/buildings/${buildingId}/apartments/${row.original.id}/contract`}
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
    </Card>
  );
};

export default ApartmentsTable;
