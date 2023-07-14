import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteItem() {
  const [deleted, setDeleted] = useState(false);

  const { itemId } = useParams();

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const API = `https://api.hirari-iq.com/api/items/${itemId}`;
  const navigate = useNavigate();
  useEffect(() => {
    DeleteItem();
    navigate("/items");
  }, []);
  const DeleteItem = () => {
    axios
      .delete(API, config)
      .then((response) => {
        setDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>{deleted ? <h1>Item deleted</h1> : <h1>Item is not deleted</h1>}</div>
  );
}

export default DeleteItem;