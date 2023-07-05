import { useLanguageStore } from "App";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";

import useFetchItems from "hooks/useFetchItems";

export default function NewOrders({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const [itemNames, setNames] = useState([]);

  const API = "https://api.hirari-iq.com/api/orders";
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;
  let usrId = usr?.id;
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { Data } = useFetchItems();
  //get Items
  useEffect(() => {
    if (Data) {
      Data.forEach((item) => {
        if (item.is_deleted !== 1) {
          setNames((previousNames) => [...previousNames, item.name]);
        }
      });
    }
  }, [Data]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    let itemName = data.item_name;
    let itemId;

    if (Data) {
      Data.map((item) => {
        if (item.name === itemName) {
          itemId = item.id;
        }
      });
    }

    const PostData = () => {
      let newData = {
        amount: data.amount,
        unit: data.unit,
        price: data.price,
        user_id: usrId,
        item_id: itemId,
      };
      axios
        .post(API, newData, config)
        .then((response) => {
          GetNewItem(Math.random());

          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.orders.addAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.orders.addAlerts.success.error"),
            showConfirmButton: true,
          });
        });
    };
    PostData();
    setShowModal(false);
    reset();
  };
  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);
  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);

  return (
    <>
      {role === "admin"||role==="engineer" ||role==="officer_eng"&& (
        <button
          className="rounded-xs rounded-md bg-gray-200 dark:bg-white dark:text-blue-800"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlus fontSize={32} />
        </button>
      )}
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden shadow-xl outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[90%] max-w-xl">
              {/* Content */}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-xl font-semibold dark:text-indigo-900">
                    {t("newOrder.title")}
                  </h3>
                  <button
                    className={`bg-transparent text-red-500 ${
                      language !== "en"
                        ? "float-left mr-auto"
                        : "float-right ml-auto"
                    } border-0 p-1 text-3xl font-semibold`}
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/* Body */}
                <div>
                  <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="amount"
                      >
                        {t("newOrder.order_amount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="amount"
                        name="amount"
                        type="number"
                        {...register("amount", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="unit"
                      >
                        {t("newOrder.order_unit")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="unit"
                        name="unit"
                        {...register("unit", { required: true })}
                      >
                        <option value="ton">ton</option>
                        <option value="m">m</option>
                        <option value="m2">m2</option>
                        <option value="m3">m3</option>
                        <option value="barrel">barrel</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="price"
                      >
                        {t("newOrder.order_price")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="price"
                        name="price"
                        type="number"
                        {...register("price", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="name"
                      >
                        {t("newOrder.item_name")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="item_name"
                        name="item_name"
                        type="string"
                        {...register("item_name", { required: true })}
                      >
                        {memoizedItemNames &&
                          memoizedItemNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div
                      className={`border-slate-200 flex items-center ${
                        language === "en" ? "justify-end" : "justify-start"
                      } rounded-b pt-5`}
                    >
                      <button
                        className="background-transparent text-md mb-1 mr-1 px-6 py-2 font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
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
      )}
    </>
  );
}