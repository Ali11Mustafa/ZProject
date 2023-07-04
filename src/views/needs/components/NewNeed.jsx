import { useLanguageStore } from "App";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";

import useFetchItems from "hooks/useFetchItems";

export default function NewNeed({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const [itemNames, setNames] = useState([]);
  const [itemTypes, setTypes] = useState([]);
  const [buildingID, setBuildingId] = useState(null);
  const [itemID, setItemID] = useState(null);
  const [user, setUser] = useState(null);

  const [buildingName, setBuildingNames] = useState([]);

  const { Data } = useFetchItems();
  //get Items
  useEffect(() => {
    if (Data) {
      Data.forEach((item) => {
        if (item.is_deleted !== 1) {
          setNames((previousNames) => [...previousNames, item.name]);
          setTypes((previousTypes) => [...previousTypes, item.type]);
          setItemID(item.id);
        }
      });
    }
    fetchData();
  }, [Data]);
  const API = "https://api.hirari-iq.com/api/blocks";


  let usr = JSON.parse(sessionStorage.getItem("user"));
  let userName = usr?.fullname;
  let email = usr?.email;
  let role = usr?.role;
  let usrId = usr?.id;
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = () => {
    axios
      .get(API, config)
      .then((response) => {
        const newBuildingNames = [];
        response.data.data.forEach((block) => {
          console.log("resp ", response.data.data);
          if (block.is_deleted !== 1) {
            newBuildingNames.push(block.name);
            setBuildingId(block.id);
          }
        });
        setBuildingNames(newBuildingNames);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { t } = useTranslation();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("data", data);
    let itemName = data.item_name;
    let itemId;

    if (Data) {
      Data.map((item) => {
        if (item.name === itemName) {
          itemId = item.id;
        }
      });
    }
    const API = "https://api.hirari-iq.com/api/needs";

    let usr = JSON.parse(sessionStorage.getItem("user"));
    let userName = usr?.fullname;
    let email = usr?.email;
    let role = usr?.role;
    let usrId = usr?.id;
    let token = usr?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("usrIdddddd", usrId);
    const PostData = () => {
      let newData = {
        need_amount: data.need_amount,
        description: data.description,
        user_id: usrId,
        block_id: buildingID,
        item_id: itemId,
      };
      // console.log(itemID);
      axios
        .post(API, newData, config)
        .then((response) => {
          GetNewItem(Math.random());

          console.log(response.status);
          console.log("add");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.newItem.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log("resp", error.response.status);
          let respp = error.response.status;
          console.log(typeof respp);
          if (respp === 400) {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: t("alerts.newItem.title"),
              showConfirmButton: true,
            });
          } else if (respp == 500) {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: t("alerts.newItem.fail"),
              showConfirmButton: true,
            });
          }
        });
    };
    PostData();
    setShowModal(false);
    reset();
  };

  const language = useLanguageStore((state) => state.language);
  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);
  const memoizedItemTypes = useMemo(() => itemTypes, [itemTypes]);
  const memoizedBuildingName = useMemo(() => buildingName, [buildingName]);
  return (
    <>
      { role === "admin" && (
        <button
          className="rounded-xs rounded-md bg-gray-200 dark:bg-white dark:text-blue-800"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlus fontSize={32} />
        </button>
      )}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-[90%] max-w-xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-xl font-semibold dark:text-indigo-900">
                    {" "}
                    {t("newNeed.title")}
                  </h3>
                  <button
                    className={`bg-transparent text-red-500 ${
                      language !== "en"
                        ? "float-left mr-auto"
                        : "float-right ml-auto"
                    } border-0 p-1 text-xl font-semibold`}
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div>
                  <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="need_amount"
                      >
                        {t("newNeed.need_amount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="need_amount"
                        name="need_amount"
                        type="text"
                        placeholder="Enter used amount"
                        {...register("need_amount", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="description"
                      >
                        {t("newNeed.description")}
                      </label>
                      <textarea
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Write a description"
                        {...register("description", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="name"
                      >
                        {t("newNeed.item_name")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="item_name"
                        name="item_name"
                        type="string"
                        {...register("item_name", { required: true })}
                      >
                        <option value="">Select a name</option>

                        {memoizedItemNames &&
                          memoizedItemNames.map((name) => {
                            return <option value={name}>{name}</option>;
                          })}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="no_of_floors"
                      >
                        {t("newNeed.building")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="building"
                        name="building"
                        type="string"
                        {...register("building", { required: true })}
                      >
                        <option value="">Select a Building</option>
                        {memoizedBuildingName &&
                          memoizedBuildingName.map((name) => {
                            return <option value={name}>{name}</option>;
                          })}
                      </select>
                    </div>

                    {/*footer*/}
                    <div
                      className={`border-slate-200 flex items-center ${
                        language === "en" ? "justify-end" : "justify-start"
                      } rounded-b pt-5`}
                    >
                      <button
                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        {t("formButtons.close")}
                      </button>
                      <button className="active:bg-emerald-600 mb-1 mr-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none">
                        {t("formButtons.create")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-30 dark:bg-black"></div>
        </>
      ) : null}
    </>
  );
}