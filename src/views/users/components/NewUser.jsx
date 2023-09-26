import { yupResolver } from "@hookform/resolvers/yup";
import { useLanguageStore } from "App";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import * as yup from "yup";

let newUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  salary: yup.number().positive().min(1).required(),
});

export default function NewItem({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newUserSchema) });
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;

  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = (data) => {
    const API = "https://api.hirari-iq.com/api/users";

    const PostData = async () => {
      await axios
        .post(API, data, config)
        .then((response) => {
          GetNewItem(Math.random());
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.users.addAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.users.addAlerts.error.title"),
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

  return (
    <>
      {role === "admin" && (
        <button
          className="bg-gray-200 rounded-md rounded-xs dark:bg-white dark:text-blue-800 "
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlus fontSize={32} />
        </button>
      )}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-[90%] max-w-xl">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none focus:outline-none dark:bg-myCard">
                {/*header*/}
                <div className="flex items-center justify-between py-5 rounded-t border-slate-200 px-7">
                  <h3 className="text-xl font-semibold dark:text-[#778da9]">
                    {t("newUser.title")}
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
                        htmlFor="name"
                      >
                        {t("newItem.name")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="name"
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="email"
                      >
                        {t("newUser.email")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="email"
                        type="text"
                        name="email"
                        {...register("email", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="password"
                      >
                        {t("newUser.password")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="password"
                        type="text"
                        name="password"
                        {...register("password", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.password?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="salary"
                      >
                        {t("newUser.salary")}
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="salary"
                        type="number"
                        name="salary"
                        defaultValue="0"
                        {...register("salary", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.salary?.message}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-black dark:font-medium dark:text-white"
                        htmlFor="role"
                      >
                        {t("newUser.role")}
                      </label>
                      <select
                        className="w-full px-3 py-2 leading-tight text-gray-700 bg-white rounded shadow focus:shadow-outline appearance-dark:none focus:outline-none dark:bg-myBlak"
                        id="role"
                        name="role"
                        type="text"
                        defaultValue="admin"
                        {...register("role", { required: true })}
                      >
                        <option value="admin">Admin</option>
                        <option value="only_read">Only Read User</option>
                        <option value="sales">Sales User</option>
                        <option value="officer_eng">Officer Engineer</option>
                        <option value="engineer">Engineer</option>
                        <option value="accountant">Accountant</option>
                      </select>
                    </div>

                    {/*footer*/}
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
          <div className="fixed inset-0 z-40 bg-black opacity-30 dark:bg-black"></div>
        </>
      ) : null}
    </>
  );
}
