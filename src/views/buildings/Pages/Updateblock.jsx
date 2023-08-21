import Layout from "Layout";
import React, { useEffect, useState } from "react";
import Card from "components/card";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function UpdateBlock() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  const { register, handleSubmit, reset, setValue } = useForm();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let usrId = usr?.id;
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/blocks/${buildingId}`;

    const PostData = () => {
      axios
        .put(API, { ...data, usrId }, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.buildings.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.buildings.updateAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };

    PostData();
    reset();
  };
  useEffect(() => {
    FetchData();
  }, [buildingId]);

  const FetchData = () => {
    axios
      .get(`https://api.hirari-iq.com/api/blocks`, config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (Data) {
      const block = Data.filter((Block) => Block.id === buildingId);
      if (block[0]) {
        setValue("name", block[0].name);
        setValue("number_of_floor", block[0].number_of_floor);
        setValue("apartment_per_floor", block[0].apartment_per_floor);
        setValue("description", block[0].description);
      }
    }
  }, [setValue, Data, buildingId]);

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
            className="text-lg text-white"
          >
            {language === "en" ? <BsArrowLeft /> : <BsArrowRight />}
          </button>
          <div className="text-xl font-semibold text-navy-700 dark:text-white">
            {t("updatePage.buildings")}
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
              {t("newBuilding.name")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
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
              htmlFor="number_of_floor"
            >
              {t("newBuilding.numberOfFloors")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="number_of_floor"
              name="number_of_floor"
              type="text"
              placeholder="Enter number of floors"
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
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="apartment_per_floor"
              name="apartment_per_floor"
              type="text"
              placeholder="Enter number of apartments per each floor"
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
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="description"
              name="description"
              type="text"
              placeholder="Write a description for the building"
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

export default UpdateBlock;
