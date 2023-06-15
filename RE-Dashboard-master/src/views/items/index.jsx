
import  itemsData  from "./variables/itemsData.json";

import ItemsTable from "./components/ItemsTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";

const ItemsDashboard = () => {

  const {itemsTableColumns} = useItemsTableColumns()

  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <ItemsTable
            columnsData={itemsTableColumns}
            tableData={itemsData}
          />
        </div>

        
      </div>
    </div>
  );
};

export default ItemsDashboard;
