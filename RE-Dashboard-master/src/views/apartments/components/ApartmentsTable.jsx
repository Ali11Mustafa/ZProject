import React, { useEffect, useMemo } from "react"; 
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";    
import { MdDeleteOutline  } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import NewApartment from "./NewApartment";
import { Link } from "react-router-dom";
import { useSearchStore } from "App";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";


const ApartmentsTable = (props) => {


  const resetSearchText = useSearchStore((state) => state.resetSearchText);
  const searchText = useSearchStore((state) => state.searchText); 

  useEffect(() => {
    resetSearchText();
  }, [resetSearchText]);

  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  
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
      data:filteredData,
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

 function handleDelete(rowId){
  console.log("delete row " + rowId)
 }

 function handleUpdate(rowId){
  console.log("update row " + rowId)
 }

 const {t} = useTranslation();


 const language = useLanguageStore(state=>state.language)

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t('apartmentsTable.title')}
        </div>

        <NewApartment/>
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
                  className={`border-b border-gray-200  pb-[10px] text-start  dark:!border-navy-700 ${language !== 'en' ?'text-right pl-[40px] lg:pl-auto' : 'pr-[40px] lg:pr-auto'}`}
                  key={index}
                  >
                  <div className="text-xs font-medium tracking-wide text-gray-600 lg:text-[14px]">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            )})}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                     if (cell.column.id === "building_id") {
                      data = (
                        <div className="flex items-center gap-4">
                         <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                        </div>
                      );
                    } else if (cell.column.id === "name") {
                      data = (
                        <div className="flex items-center">
                          <Link to='/apartments/1'className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </Link>
                        </div>
                      );
                    } else if (cell.column.id === "type") {
                      data = (
                         <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    } else if (cell.column.id === "number_of_installments") {
                      data = (
                         <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    }else if (cell.column.id === "price_per_installments") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "remaining_price") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "total_price") {
                      data = (
                         <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "description") {
                      data = (
                        <p className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "actions") {
                      data = (
                        <div className="flex items-center gap-4">
                       <button
                            className="flex items-center gap-1 text-red-600"
                            onClick={() => handleDelete(row.id)}
                          >
                            <div className="flex   items-center justify-center rounded-sm  from-brandLinear to-brand-500  text-xl   ">
                              <MdDeleteOutline />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.delete")}
                            </p>
                          </button>
                          <button
                            className="flex items-center gap-1 text-green-600"
                            onClick={() => handleUpdate(row.id)}
                          >
                            <div className="flex   items-center justify-center rounded-sm  from-brandLinear to-brand-500  text-lg   ">
                              <FiEdit />
                            </div>
                            <p className=" text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.update")}
                            </p>
                          </button>

                              
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

