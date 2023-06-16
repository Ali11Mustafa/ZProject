import React,{useState,useEffect} from 'react'
import axios from 'axios';

function useFetchItems() {
const [Data,setData]=useState([]);
const API="https://api.hirari-iq.com/api/items";
  
  useEffect(()=>{
    FetchData();
    console.log(Data);
  },[]);

   const FetchData=()=>{
    axios.get(API)
  .then(response => {
    console.log(response.data);
    setData(response.data.data);
  })
  .catch(error => {
    console.error(error);
  });
  }
  return {Data}
  
}

export default useFetchItems