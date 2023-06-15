import React, { useMemo} from "react"; 
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import NewNeed from "./NewNeed";
import { useLanguageStore } from "App";
import { useTranslation } from "react-i18next";


const NeedsTable = (props) => {
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


 const language = useLanguageStore(state=>state.language)

 const {t} =  useTranslation()

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-semibold text-navy-700 dark:text-white">
        {t('needsTable.title')}
        </div>
        <NewNeed/>
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
                     <div className="text-xs font-medium tracking-wide text-gray-600 lg:text-[14px]"> {column.render("Header")}
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
                      }else if (cell.column.id === "used_amount") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }else if (cell.column.id === "building") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "total_item_per_floor") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "description") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
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

export default NeedsTable;

