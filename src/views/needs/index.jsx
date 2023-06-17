

import { useState, useEffect } from "react";
import axios from "axios";
import NeedsTable from "./components/NeedsTable"; 
import useNeedsTableColumns from "./variables/useNeedsTableColumns";

const NeedsDashboard = () => {
  const[needs,setNeeds]=useState([]);

  const {needsTableColumns} = useNeedsTableColumns()
  const API = "https://api.hirari-iq.com/api/needs";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API)
      .then((response) => {
        setNeeds(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <NeedsTable
            columnsData={needsTableColumns}
            tableData={needs}
          />
        </div>

        
      </div>
    </div>
  );
};

export default NeedsDashboard;
