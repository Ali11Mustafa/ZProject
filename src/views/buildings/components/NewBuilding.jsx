import { useLanguageStore } from "App";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";

export default function NewBuilding({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit, reset, setValue } = useForm();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  let role=usr?.role;
  const onSubmit = (data) => {
    const API = "https://api.hirari-iq.com/api/blocks";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const PostData = () => {
      axios
        .post(API, { ...data, level: "0" }, config)
        .then((response) => {
          GetNewItem(Math.random());
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.buildings.addAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.buildings.addAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };
    PostData();
    setShowModal(false);
    reset();
  };
  useEffect(() => {
    setValue("number_of_floor", 0);
    setValue("apartment_per_floor", 0);
  });
  

  const language = useLanguageStore((state) => state.language);

  return (
    <>
    {role === "admin" && (
      
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
                    {t("newBuilding.title")}
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
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="name"
                      >
                        {t("newBuilding.name")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="name"
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="number_of_floor"
                      >
                        {t("newBuilding.numberOfFloors")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="number_of_floor"
                        name="number_of_floor"
                        type="number"
                        {...register("number_of_floor", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="apt_per_floor"
                      >
                        {t("newBuilding.numberOfApartmentsPerFloor")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="apartment_per_floor"
                        name="apartment_per_floor"
                        type="number"
                        {...register("apartment_per_floor", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="description"
                      >
                        {t("newBuilding.description")}
                      </label>
                      <textarea
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="description"
                        name="description"
                        type="text"
                        {...register("description", { required: true })}
                      />
                    </div>
                    {/*footer*/}
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
      ) : null}
    </>
  );
}