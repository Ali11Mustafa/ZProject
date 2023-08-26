import { useLanguageStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import useFetchItems from "hooks/useFetchItems";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateOrder() {
  const { orderId } = useParams();
  const { Data } = useFetchItems();

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [itemNames, setNames] = useState([]);
  const navigate = useNavigate();

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const formData = watch();
  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/orders/${orderId}`;

    const PostData = () => {
      axios
        .put(API, { ...data, user: 1 }, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.orders.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate("/orders");
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.orders.updateAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };

    PostData();
    reset();
  };
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

  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    axios
      .get("https://api.hirari-iq.com/api/orders", config)
      .then((res) => {
        const currentOrder = res.data.data.filter(
          (need) => need.id === orderId
        );
        if (currentOrder[0]) {
          setValue("amount", currentOrder[0].amount);
          setValue("price", currentOrder[0].price);
          setValue("unit", currentOrder[0].unit);
          setValue("name", currentOrder[0].item_info.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderId]);

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
              htmlFor="amount"
            >
              {t("newOrder.order_amount")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="amount"
              name="amount"
              type="number"
              disabled={usr.role === "accountant"}
              {...register("amount", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="type"
            >
              {t("newOrder.order_unit")}
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="unit"
              name="unit"
              disabled={usr.role === "accountant"}
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
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="price"
              name="price"
              type="number"
              {...register("price", { required: true })}
            />
          </div>
          {usr.role !== "accountant" ? (
            <div className="mb-4">
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="name"
              >
                {t("newOrder.item_name")}
              </label>

              <select
                className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
                id="name"
                name="name"
                type="string"
                disabled={usr.role === "accountant"}
                {...register("name", { required: true })}
              >
                {memoizedItemNames &&
                  memoizedItemNames.map((name) => {
                    return <option value={name}>{name}</option>;
                  })}
              </select>
            </div>
          ) : (
            <div className="mb-4">
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="name"
              >
                {t("newOrder.item_name")}
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
                id="name"
                name="name"
                type="text"
                disabled={usr.role === "accountant"}
                {...register("name", { required: true })}
              />
            </div>
          )}

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

export default UpdateOrder;
