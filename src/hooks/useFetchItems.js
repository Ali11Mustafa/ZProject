import React,{useState,useEffect} from 'react'
import axios from 'axios';

function useFetchItems() {
 
const [Data,setData]=useState([]);
const API="https://api.hirari-iq.com/api/items";
  useEffect(()=>{
    FetchData();
  },[]);

   const FetchData=()=>{
    axios.get(API)
  .then(response => {
    response.data.data.map((item)=>{
      if(item.is_deleted!==1){
        setData(previousItem=>[...previousItem,item]);
      }
    })
  })
  .catch(error => {
    console.error(error);
  });
  }
  return {Data}
  
}

export default useFetchItems


