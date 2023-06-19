import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
function DeleteItem() {
const [deleted,setDeleted]=useState(false);

const {itemId}=useParams();
console.log(itemId)
const API=`https://api.hirari-iq.com/api/orders/${itemId}`;
  const navigate=useNavigate();
  useEffect(()=>{
    DeleteItem();
    navigate("/orders")
  },[]);
   const DeleteItem=()=>{
    axios.delete(API)
  .then(response => {
    setDeleted(true);
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
  }

  return (
    <div>{deleted ?<h1>Item deleted</h1>:<h1>Item is not deleted</h1>}</div>
  )
}

export default DeleteItem