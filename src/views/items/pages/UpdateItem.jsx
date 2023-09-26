import { useLanguageStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import useFetchItems from "hooks/useFetchItems";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue } = useForm();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let usrId = usr?.id;
  let token = usr?.token;

  const { Data: items } = useFetchItems();
  const currentItem = items.filter((item) => item.id === itemId);

  useEffect(() => {
    if (currentItem[0]) {
      setValue("name", currentItem[0].name);
      setValue("type", currentItem[0].type);
    }
  }, [items, currentItem]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/items/${itemId}`;

    const PostData = () => {
      axios
        .put(API, { ...data, user: usrId }, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.items.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate("/items");
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.items.updateAlerts.success.title"),
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
            {t("updatePage.items")}
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
              {t("newItem.name")}
            </label>
            <input
              className="focus:shadow-outline w-full  rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="name"
              type="text"
              placeholder="Enter name"
              name="name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="no_of_floors"
            >
              {t("newItem.type")}
            </label>
            <select
              className="focus:shadow-outline w-full  rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="type"
              name="type"
              type="string"
              {...register("type", { required: true })}
            >
              <option value="10mm">10mm</option>
              <option value="15mm">15mm</option>
              <option value="20mm">20mm</option>
              <option value="25mm">25mm</option>
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
