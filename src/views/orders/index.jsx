
import { useEffect,useState } from "react";
import  itemsData  from "./variables/itemsData.json";
import OrdersTable from "./components/OrdersTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";
import axios from "axios";
import useFetchItems from "hooks/useFetchItems";
import { useItemsStore } from "App";


const OrdersDashboard = () => {
  const {itemsTableColumns} = useItemsTableColumns();
  const [newItem, setNewItem] = useState("");


  const GetNewItem = (item) =>  {
    setNewItem(item);
    //Math.random
  }
  
 const [orders,setOrders]=useState([]);
 const API="https://api.hirari-iq.com/api/orders";
   useEffect(()=>{
     FetchData();
   },[newItem]);
 
    
   const FetchData=()=>{
    axios.get(API)
  .then(response => {
    console.log("responseee",response.data.data);

    let arrayNotDeleted = []
    response.data.data.map((item)=>{
      if(item.is_deleted!==1){
        arrayNotDeleted.push(item);
      }

    })
    
  setOrders(arrayNotDeleted);

  })
  .catch(error => {
    console.error(error);
  });
  }



  return (
    <div>
      
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
  
        <div>
          <OrdersTable
            columnsData={itemsTableColumns}
            tableData={orders}
            GetNewItem={GetNewItem}
            
          />
        </div>

        
      </div>
    </div>
  );
};

export default OrdersDashboard;
