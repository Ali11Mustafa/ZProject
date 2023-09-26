import { yupResolver } from "@hookform/resolvers/yup";
import { useLanguageStore } from "App";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

let newNeedSchema = yup.object({
  apartment_number: yup
    .number()
    .positive("Apartment number should be a positive number")
    .min(1, "Apartment number must be equal or greater than 1")
    .required("Apartment number is required"),
  floor_number: yup
    .number()
    .positive("FLoor number should be a positive number")
    .min(1, "FLoor number must be equal or greater than 1")
    .required("FLoor number is required"),
  area: yup
    .number()
    .positive("Area should be a positive number")
    .min(1, "Area must be equal or greater than 1")
    .required("Area is required"),
});

export default function NewApartment({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const { buildingId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newNeedSchema),
  });

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const onSubmit = (data) => {
    const API = "https://api.hirari-iq.com/api/apartments";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedData = {
      block_id: buildingId,
      floor_number: data.floor_number,
      area: data.area,
      apartment_number: data.apartment_number,
    };

    axios
      .post(API, updatedData, config)
      .then((response) => {
        GetNewItem(Math.random());
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: t("alerts.apartments.addAlerts.success.title"),
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: t("alerts.apartments.addAlerts.error.title"),
          showConfirmButton: true,
          timer: 1500,
        });
      });

    setShowModal(false);
    reset();
  };

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);

  return (
    <>
      <button
        className="bg-gray-200 rounded-md rounded-xs dark:bg-white dark:text-blue-800 "
        type="button"
        onClick={() => setShowModal(true)}
      >
        <BsPlus fontSize={32} />
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-[90%] max-w-xl">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none focus:outline-none dark:bg-myCard">
                {/*header*/}
                <div className="flex items-center justify-between py-5 rounded-t border-slate-200 px-7">
                  <h3 className="text-xl font-semibold dark:text-[#778da9]">
                    {t("newApartment.title")}
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
                {/*body*/}
                <div>
                  <form
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded dark:bg-myCard"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="apartment_number"
                      >
                        {t("newApartment.apartmentNumber")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="apartment_number"
                        type="number"
                        defaultValue="0"
                        name="apartment_number"
                        {...register("apartment_number", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.apartment_number?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="floor_number"
                      >
                        {t("newApartment.floorNumber")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="floor_number"
                        name="floor_number"
                        type="number"
                        defaultValue="0"
                        {...register("floor_number", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.floor_number?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="area"
                      >
                        {t("newApartment.area")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="area"
                        name="area"
                        type="number"
                        defaultValue="0"
                        {...register("area", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.area?.message}
                      </p>
                    </div>

                    <div
                      className={`border-slate-200 flex items-center ${
                        language === "en" ? "justify-end" : "justify-start"
                      } rounded-b pt-5`}
                    >
                      <button
                        className="px-6 py-2 mb-1 mr-1 font-medium text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent text-md focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        {t("formButtons.close")}
                      </button>
                      <button className="px-6 py-2 mb-1 mr-1 text-sm font-medium text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none active:bg-emerald-600 bg-myPrimary hover:shadow-lg focus:outline-none md:hover:bg-mySecondary">
                        {t("formButtons.create")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
        </>
      ) : null}
    </>
  );
}
