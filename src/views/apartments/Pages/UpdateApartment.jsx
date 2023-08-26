import { useLanguageStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateApartment() {
  const { buildingId, apartmentId } = useParams();
  const navigate = useNavigate();
  const [apartmentsData, setApartmentsData] = useState([]);

  function goback() {
    navigate(-1);
  }

  const { register, handleSubmit, reset, setValue } = useForm();
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/apartments/${apartmentId}`;

    const PostData = () => {
      axios
        .put(API, { ...data, block_id: buildingId }, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.apartments.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate(`/buildings/${buildingId}/apartments`);
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.apartments.updateAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };
    PostData();
    reset();
  };

  useEffect(() => {
    axios
      .get(`https://api.hirari-iq.com/api/apartments/${buildingId}`, config)
      .then((response) => {
        const apartment = response.data.data.filter(
          (apartment) => apartment.id === apartmentId
        );
        if (apartment[0]) {
          setValue("apartment_number", apartment[0].apartment_number);
          setValue("floor_number", apartment[0].floor_number);
          setValue("area", apartment[0].area);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apartmentId, buildingId, apartmentsData, setValue, config]);

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
            {t("updateApartment.title")}
          </div>
        </div>
        <form
          className="mb-4 rounded px-8 pt-6 pb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="apartment_number"
            >
              {t("updateApartment.apartmentNumber")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="apartment_number"
              type="text"
              name="apartment_number"
              {...register("apartment_number", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="floor_number"
            >
              {t("updateApartment.floorNumber")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="floor_number"
              name="floor_number"
              type="number"
              {...register("floor_number", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="area"
            >
              {t("updateApartment.area")}
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="area"
              name="area"
              type="number"
              {...register("area", { required: true })}
            />
          </div>

          <div
            className={`border-slate-200 flex items-center ${
              language === "en" ? "justify-end" : "justify-start"
            } rounded-b pt-5`}
          >
            <button
              className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
              onClick={() => {
                navigate(-1);
              }}
            >
              {t("formButtons.cancel")}
            </button>
            <button className="active:bg-emerald-600 mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-mySecondary hover:shadow-lg focus:outline-none">
              {t("formButtons.update")}
            </button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default UpdateApartment;
