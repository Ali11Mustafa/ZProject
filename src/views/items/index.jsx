
import { useEffect,useState } from "react";
import  itemsData  from "./variables/itemsData.json";
import ItemsTable from "./components/ItemsTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";
import axios from "axios";
import useFetchItems from "hooks/useFetchItems";

const ItemsDashboard = () => {
  const {itemsTableColumns} = useItemsTableColumns();
 const {Data}=useFetchItems();


  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <ItemsTable
            columnsData={itemsTableColumns}
            tableData={Data}
          />
        </div>

        
      </div>
    </div>
  );
};

export default ItemsDashboard;
