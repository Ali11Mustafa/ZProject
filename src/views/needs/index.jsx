

import { useState, useEffect } from "react";
import axios from "axios";
import NeedsTable from "./components/NeedsTable"; 
import useNeedsTableColumns from "./variables/useNeedsTableColumns";
 
  
const NeedsDashboard = () => {
  const[needs,setNeeds]=useState([]);
  const [newItem, setNewItem] = useState("");


  const GetNewItem = (item) =>  {
    setNewItem(item);
    //Math.random
  }
  
  const {needsTableColumns} = useNeedsTableColumns()
  const API = "https://api.hirari-iq.com/api/needs";

  useEffect(() => {
    fetchData();
  }, [newItem]);

  const fetchData=()=>{
    axios.get(API)
  .then(response => {

    console.log("resppppp " +response);
    let arrayNotDeleted = []
    response.data.data.map((item)=>{
      if(item.is_deleted!==1){
        arrayNotDeleted.push(item);

        console.log("resppppp " +item);
      }

    })
    
  setNeeds(arrayNotDeleted);

  })
  .catch(error => {
    console.error(error);
  });
  }

  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <NeedsTable
            columnsData={needsTableColumns}
            tableData={needs}
            GetNewItem={GetNewItem}
          />
        </div>

        
      </div>
    </div>
  );
};

export default NeedsDashboard;
