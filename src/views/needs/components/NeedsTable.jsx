import React, { useMemo} from "react"; 
import Card from "components/card";
import axios from "axios";
import Swal from 'sweetalert2'

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import NewNeed from "./NewNeed";
import { useLanguageStore } from "App";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const NeedsTable = (props) => {
  const { columnsData, tableData ,GetNewItem }=props;
  console.log("response "+tableData);

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
 function onAccept(e){
  console.log(e.target.getAttribute('value'));

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Accept'
  }).then((result) => {
 
    if (result.isConfirmed) {
      Swal.fire(
        'Accepted!',
        'Your file has been saved.',
        'success'
      )
      const res=axios.put(`https://api.hirari-iq.com/api/needs/accept/${e.target.getAttribute('value')}}`).then((response)=>{
        // setDeleted(true);
        GetNewItem(Math.random());
        console.log(response);
        
      })
      
    
    }
  })
 //ssssssssss
.catch(error => {
  Swal.fire(
    'the item not deleted',
    'oopss',
    'failed'
  )
});

}

 function deleteMe(e){
  console.log(e.target.getAttribute('value'));

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete'
  }).then((result) => {
 
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      const res= axios.delete(`https://api.hirari-iq.com/api/needs/${e.target.getAttribute('value')}`)
      .then(response => {
        // setDeleted(true);
        GetNewItem(Math.random());
        console.log(response);
        if(response.status!=200)
        Swal.fire(
          'the item not deleted',
          'oopss',
          'failed'
        )
      })
      
    
    }
  })
}

 const {t} =  useTranslation()

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-5"}>
      <header className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-semibold text-navy-700 dark:text-white">
        {t('needsTable.title')}
        </div>
        <NewNeed GetNewItem={GetNewItem}/>
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
                    
                     if (cell.column.id === "need_amount") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                      }else if (cell.column.id === "description") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                      }else if (cell.column.id === "status") {
                        data = cell.value !== "accept" ? 
  
                            <div className="flex gap-2 items-center">
                            <button value={row.original.id} onClick={onAccept} className="bg-green-400 px-2 py-1 rounded-md dark:text-black">Accept</button>
                            <button className="bg-red-400 px-2 py-1 rounded-md dark:text-black">Reject</button>
                            </div>
                          : <p  className="text-sm font-medium text-green-600 ">{cell.value }</p>
                          
                         
                      }else if (cell.column.id === "user_info.name") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }
                    else if (cell.column.id === "item_info.remaining_item") {
                      data = (
                        <p  className="text-sm font-medium text-black dark:text-white">
                        {cell.value}
                      </p>
                      );
                    }
                    else if(cell.column.id==="item_info.type"){
                        data = (
                          <p  className="text-sm font-medium text-black dark:text-white">
                          {cell.value}
                        </p>
                        );
                      
                        } else if(cell.column.id==="item_info.name"){
                          data = (
                            <p  className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                          );
                        
                          } else if (cell.column.id === "block_info.name") {
                          data = (
                            <p  className="text-sm font-medium text-black dark:text-white">
                            {cell.value}
                          </p>
                          );
                        }else if (cell.column.id === "actions") {
                          data = (
                            <div className="flex items-center gap-4">
                              <button
                              value={row.original.id}
                             onClick={deleteMe}
                            className="flex items-center gap-1 text-red-600"
                              >
                                <div   value={row.original.id} className="flex   items-center justify-center rounded-sm  from-brandLinear to-brand-500  text-xl   ">
                                  <MdDeleteOutline  value={row.original.id} />
                                </div>
                                <p   value={row.original.id} className="text-start text-sm font-medium text-black dark:text-white">
                                  {t("actions.delete")}
                                </p>
                              </button>
                              <Link
                              to={`/needs/update/${row.original.id}`}
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

export default NeedsTable;
