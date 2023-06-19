
import { useEffect,useState } from "react";
import  itemsData  from "./variables/itemsData.json";
import ItemsTable from "./components/ItemsTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";
import axios from "axios";
import useFetchItems from "hooks/useFetchItems";
import { useItemsStore } from "App";

const ItemsDashboard = () => {

  const [itemNames,setNames]=useState([]);
  const [itemTypes,setTypes]=useState([]);
  const {itemsTableColumns} = useItemsTableColumns();
 const {Data}=useFetchItems();
 const setItemNames=useItemsStore(state=>state.setItemNames);
 const setItemTypes=useItemsStore(state=>state.setItemTypes);


//get ite Names
useEffect(() => {
  if (Data) {
    const names = [];
    const types = [];

    Data.map((item) => {
      if (item.is_deleted !== 1) {
        names.push(item.name);
        types.push(item.type);
      }
    });

    setItemNames(names);
    setItemTypes(types);
  }
}, [[Data, setItemNames, setItemTypes]]);



 

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
