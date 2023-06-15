

import  needsData  from "./variables/needsData.json";

import NeedsTable from "./components/NeedsTable"; 
import useNeedsTableColumns from "./variables/useNeedsTableColumns";

const NeedsDashboard = () => {

  const {needsTableColumns} = useNeedsTableColumns()

  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <NeedsTable
            columnsData={needsTableColumns}
            tableData={needsData}
          />
        </div>

        
      </div>
    </div>
  );
};

export default NeedsDashboard;
