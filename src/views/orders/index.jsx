
import { useEffect,useState } from "react";
import  itemsData  from "./variables/itemsData.json";
import OrdersTable from "./components/OrdersTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";
import axios from "axios";
import useFetchItems from "hooks/useFetchItems";
import { useItemsStore } from "App";


const OrdersDashboard = () => {
  const {itemsTableColumns} = useItemsTableColumns();


 const [orders,setOrders]=useState([]);
 const API="https://api.hirari-iq.com/api/orders";
   useEffect(()=>{
     FetchData();
   },[]);
 
    const FetchData=()=>{
     axios.get(API)
   .then(response => {
     response.data.data.map((item)=>{
       if(item.is_deleted!==1){
         setOrders(previousItem=>[...previousItem,item]);
       }
 
     })
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
          />
        </div>

        
      </div>
    </div>
  );
};

export default OrdersDashboard;
