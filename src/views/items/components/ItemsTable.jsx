import React, { useMemo } from "react"; 
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import NewItem from "./NewItem";
import { useLanguageStore } from "App";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";


const ItemsTable = (props) => {
  const { columnsData, tableData } = props;

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

  const {t} = useTranslation()


 const language = useLanguageStore(state=>state.language)

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-semibold text-navy-700 dark:text-white">
          {t("itemsTable.title")}
        </div>
        <NewItem/>
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
                    <div className="text-xs font-medium tracking-wide text-gray-600 lg:text-[14px]">{column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            )})}
          </thead>
          <tbody {...getTableBodyProps()} >
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index} >
                  {row.cells.map((cell, index) => {
                  
                    let data = "";
                   if (cell.column.id === "name") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    else if (cell.column.id === "remaining_item") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                   
                    else if (cell.column.id === "type") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }
                    
                    else if (cell.column.id === "actions") {
                      data = (
                        <div className="flex items-center gap-4">
                          <Link
                          to={`/items/delete/${row.original.id}`}

className="flex items-center gap-1 text-red-600"
                          >
                            <div className="flex   items-center justify-center rounded-sm  from-brandLinear to-brand-500  text-xl   ">
                              <MdDeleteOutline />
                            </div>
                            <p className="text-start text-sm font-medium text-black dark:text-white">
                              {t("actions.delete")}
                            </p>
                          </Link>
                          <Link
                          to={`/items/update/${row.original.id}`}
                            className="flex items-center gap-1 text-green-600"
                          >
                            <div className="flex   items-center justify-center rounded-sm  from-brandLinear to-brand-500  text-lg   ">
                              <FiEdit />
                            </div>
                            <p className=" text-start text-sm font-medium text-black dark:text-white">
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
