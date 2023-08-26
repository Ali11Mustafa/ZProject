import { useUserConfigStore } from "App";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetchItems() {
  const [Data, setData] = useState([]);
  const API = "https://api.hirari-iq.com/api/items";
  const userConfig = useUserConfigStore((state) => state.userConfig);
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;

  useEffect(() => {
    if (role !== "accountant" || role !== "officer_enginner") {
      FetchData();
    }
  }, []);

  const FetchData = async () => {
    await axios
      .get(API, userConfig)
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
