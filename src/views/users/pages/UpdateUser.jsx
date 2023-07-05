import Layout from "Layout";
import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateItem() {
  const { userId } = useParams();

  const [Data, setData] = useState([]);

  let usr = JSON.parse(sessionStorage.getItem("user"));

  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    axios
      .get(`https://api.hirari-iq.com/api/users/${userId}`, config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (Data) {
      setValue("name", Data.name);
      setValue("role", Data.role);
      setValue("email", Data.email);
      setValue("salary", Data.salary);
    }
  }, [setValue, Data]);

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/users/${userId}`;

    const PostData = () => {
      axios
        .put(API, data, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.users.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate("/users");
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.users.updateAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };

    PostData();
    reset();
  };

  const { t } = useTranslation();

  const language = useLanguageStore((state) => state.language);

  return (
    <Layout>
      <Card extra={"w-full h-full sm:overflow-auto px-5 p-5"}>
        <h1 className="mb-10 text-xl font-bold">Update Users</h1>
        <form
          className="mb-4 rounded bg-white px-8 pt-6 pb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="name"
            >
              {t("newItem.name")}
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
              htmlFor="email"
            >
              {t("email")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="text"
              name="email"
              {...register("email", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="salary"
            >
              {"salary"}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="salary"
              type="text"
              name="salry"
              {...register("salary", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="role"
            >
              {"role"}
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="role"
              name="role"
              type="text"
              {...register("role", { required: true })}
            >
              <option value="admin">admin</option>
              <option value="only_read">only red</option>
              <option value="officer_eng">officer Eng</option>
              <option value="engineer">engineer</option>
              <option value="accountant">accountant</option>
            </select>
          </div>

          {/*footer*/}
          <div
            className={`border-slate-200 flex items-center ${
              language === "en" ? "justify-end" : "justify-start"
            } rounded-b pt-5`}
          >
            <Link
              to="/users"
              className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
              type="button"
            >
              {t("formButtons.cancel")}
            </Link>
            <button className="active:bg-emerald-600 mb-1 mr-1 rounded bg-indigo-700 px-6 py-3 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none">
              {t("formButtons.update")}
            </button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default UpdateItem;