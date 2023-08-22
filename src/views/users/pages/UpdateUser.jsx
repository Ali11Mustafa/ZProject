import { useLanguageStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
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
      <Card
        extra={
          "w-full h-full sm:overflow-auto px-5 mt-10 p-5 mt-10 max-w-[1800px] mx-auto"
        }
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="text-lg text-black dark:text-white"
          >
            {language === "en" ? <BsArrowLeft /> : <BsArrowRight />}
          </button>
          <div className="text-xl font-semibold text-navy-700 dark:text-white">
            {t("updatePage.users")}
          </div>
        </div>
        <form
          className="mb-4 rounded px-8 pt-6 pb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="name"
            >
              {t("newUser.username")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
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
              {t("newUser.email")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
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
              {t("newUser.salary")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
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
              {t("newUser.role")}
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
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
            <button
              type="button"
              className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
              onClick={() => {
                navigate(-1);
              }}
            >
              {t("formButtons.cancel")}
            </button>
            <button
              type="submit"
              className="active:bg-emerald-600 mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-mySecondary hover:shadow-lg focus:outline-none"
            >
              {t("formButtons.update")}
            </button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default UpdateItem;
