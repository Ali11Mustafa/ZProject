import axios from "axios";
import { useEffect, useState } from "react";

function useFetchItems() {
  const [Data, setData] = useState([]);
  const API = "https://api.hirari-iq.com/api/items";
  useEffect(() => {
    FetchData();
  }, []);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const FetchData = async () => {
    await axios
      .get(API, config)
      .then((response) => {
        response.data.data.map((item) => {
          if (item.is_deleted !== 1) {
            setData((previousItem) => [...previousItem, item]);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return { Data };
}

export default useFetchItems;