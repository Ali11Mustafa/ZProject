
import { useEffect,useState } from "react";
import  itemsData  from "./variables/itemsData.json";
import ItemsTable from "./components/ItemsTable"; 
import useItemsTableColumns from "./variables/useItemsTableColumns";
import useFetchItems from "hooks/useFetchItems";
import { useItemsStore } from "App";
import axios from 'axios';

const ItemsDashboard = () => {

  const [itemNames,setNames]=useState([]);
  const [itemTypes,setTypes]=useState([]);
  const {itemsTableColumns} = useItemsTableColumns();
  const [newItem, setNewItem] = useState("");
 
  const GetNewItem = (item) =>  {
    setNewItem(item);
    //Math.random
  }

  const [Data,setData]=useState([]);

  // useEffect(()=>{
  //   FetchData();
  // },[]); 

    useEffect(()=>{
      FetchData();
    },[newItem]); 
    let usr = JSON.parse(sessionStorage.getItem('user'));
    let userName = usr?.fullname;
    let email = usr?.email;
    let image = usr?.img;
    let usrId = usr?.id;
    let token = usr?.token;
  
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const API="https://api.hirari-iq.com/api/items";

     const FetchData=()=>{
      axios.get(API,config)
    .then(response => {

      let arrayNotDeleted = []
      response.data.data.map((item)=>{
        if(item.is_deleted!==1){
          arrayNotDeleted.push(item);
        }
  
      })
      
    setData(arrayNotDeleted);
 
    })
    .catch(error => {
      console.error(error);
    });
    }

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
            GetNewItem = {GetNewItem} 
          />
        </div>

        
      </div>
    </div>
  );
};

export default ItemsDashboard;
