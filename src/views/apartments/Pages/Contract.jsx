import { yupResolver } from "@hookform/resolvers/yup";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLanguageStore, usePdfStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import Pdf from "../components/Pdf";

let contractSchema = yup.object({
  owner_name: yup.string().required("Owner name is required"),
  phone_number: yup.number().required("Phone number is required"),
  buyer_address: yup.string().required("Buyer address is required"),
  buyer_card_id: yup.number().required("Buyer card ID is required"),
  contract_date: yup.string().required("Contract date is required"),
  total_payment_price: yup
    .number()
    .required("Total payment price is required")
    .min(1, "Total payment price must be greater than or equal to 1"),
  apartment_price: yup
    .number()
    .required("Apartment price is required")
    .min(1, "Apartment price must be greater than or equal to 1"),
  pending_price: yup.number().required("Pending price is required"),
  contract_type: yup.string().required("Contract type is required"),
  apartment_description: yup.string().required("Description is required"),
});

function Contract() {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const navigate = useNavigate();
  const { apartmentId, buildingId } = useParams();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    resolver: yupResolver(contractSchema),
  });

  const { total_payment_price, apartment_price } = watch();

  useEffect(() => {
    if (total_payment_price && apartment_price) {
      let pending_price = apartment_price - total_payment_price;
      setValue("pending_price", pending_price);
    }
  }, [total_payment_price, apartment_price]);

  const [isReserved, setIsReserved] = useState(false);
  const [contractData, setContractData] = useState(null);

  const [isUpdatable, setIsUpdatable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const downloadPdfRef = useRef();
  const [contractId, setContractId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isSold, setIsSold] = useState(false);

  function goBack() {
    navigate(-1);
  }

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const {
    setOwnerName,
    setContractDate,
    setTotalPaymentPrice,
    setPendingPrice,
    setPhoneNumber,
    setApartmentPrice,
    setApartmentNumber,
    setFloorNumber,
    setArea,
    setbuyerCardId,
    setbuyerAddress,
    setBuildingName,
    ownerName,
    contractDate,
    totalPaymentPrice,
    phoneNumber,
    apartmentPrice,
    apartmentNumber,
    buildingName,
    floorNumber,
    area,
    buyerCardId,
    buyerAddress,
    pendingPrice,
  } = usePdfStore();

  useEffect(() => {
    const API = `https://api.hirari-iq.com/api/blocks`;
    axios
      .get(API, config)
      .then((response) => {
        const currentBuilding = response.data.data.filter(
          (block) => block.id === buildingId
        );
        if (currentBuilding) {
          setBuildingName(currentBuilding[0]?.name);
        } else {
          setBuildingName("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [buildingId]);

  function onHold() {
    const API = `https://api.hirari-iq.com/api/apartments/${apartmentId}/on_hold`;
    axios
      .put(API, {}, config)
      .then((response) => {
        setIsOnHold(true);
        setIsEditable(true);
      })
      .catch((error) => {
        console.error(error);
        setIsOnHold(false);
        setIsEditable(false);
      });
  }

  function unHold() {
    const API = `https://api.hirari-iq.com/api/apartments/${apartmentId}/un_hold`;
    axios
      .put(API, {}, config)
      .then((response) => {
        setIsOnHold(false);
        setIsEditable(false);
      })
      .catch((error) => {
        console.error(error);
        setIsOnHold(true);
        setIsEditable(true);
      });
  }

  useEffect(() => {
    const API = `https://api.hirari-iq.com/api/apartments/${apartmentId}`;
    if (config) {
      axios
        .put(API, config)
        .then((response) => {
          const apartmentDetail = response.data.data;
          // is on hold
          if (apartmentDetail.status === "onHold") {
            setIsOnHold(true);
          } else {
            setIsOnHold(false);
          }

          // is sold
          if (apartmentDetail.status === "notAvailabe") {
            setIsSold(true);
          } else {
            setIsSold(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [apartmentId]);

  // get the contract data function
  async function getContractData() {
    const API = `https://api.hirari-iq.com/api/contract/${apartmentId}`;
    axios
      .get(API, config)
      .then((response) => {
        setIsReserved(true);
        setIsEditable(true);
        setContractData(response.data.data);
        setContractId(response.data.data.id.toString());

        if (response.data.data) {
          setValue("contract_date", response.data.data.contract_date);
          setValue("owner_name", response.data.data.owner_name);
          setValue(
            "total_payment_price",
            response.data.data.total_payment_price
          );
          setValue("pending_price", response.data.data.pending_price);
          setValue("phone_number", response.data.data.phone_number);
          setValue(
            "apartment_number",
            response.data.data.apartment_detail?.apartment_number
          );
          setValue("apartment_price", response.data.data.apartment_price);
          setValue("buyer_card_id", response.data.data.buyer_card_id);
          setValue("buyer_address", response.data.data.buyer_address);
          setValue("contract_type", response.data.data.contract_type.trim());
          setValue(
            "apartment_description",
            response.data.data.apartment_description
          );
        }
      })
      .catch((error) => {
        setIsReserved(false);
        setIsEditable(false);
      });
  }

  // get the contract on first render
  useEffect(() => {
    getContractData();
  }, [apartmentId]);

  async function onSubmit(data) {
    const API = `https://api.hirari-iq.com/api/contract`;
    setIsReserved(true);
    setIsEditable(true);
    setIsUpdatable(true);

    const contractData = {
      owner_name: data.owner_name.toString(),
      phone_number: data.phone_number.toString(),
      contract_date: data.contract_date.toString(),
      apartment_price: data.apartment_price.toString(),
      total_payment_price: data.total_payment_price.toString(),
      pending_price: data.pending_price.toString(),
      contract_type: data.contract_type.toString(),
      buyer_address: data.buyer_address,
      buyer_card_id: data.buyer_card_id.toString(),
      apartment_description: data.apartment_description.toString(),
      apartment_id: apartmentId.toString(),
    };

    try {
      await axios.post(API, contractData, config);
      const res = await axios.get(
        `https://api.hirari-iq.com/api/contract/${apartmentId}`,
        config
      );
      if (res) {
        setIsSubmitted(true);
        setApartmentNumber(res.data.data.apartment_detail.apartment_number);
        setApartmentPrice(res.data.data.apartment_price);
        setArea(res.data.data.apartment_detail.area);
        setFloorNumber(res.data.data.apartment_detail.floor_number);
        setContractDate(res.data.data.contract_date);
        setOwnerName(res.data.data.owner_name);
        setbuyerCardId(res.data.data.buyer_card_id);
        setbuyerAddress(res.data.data.buyer_address);
        setPhoneNumber(res.data.data.phone_number);
        setTotalPaymentPrice(res.data.data.total_payment_price);
        setPendingPrice(res.data.data.pending_price);
        setIsSold(true);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: t("alerts.contract.addAlerts.success.title"),
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } catch (error) {
      setIsSubmitted(false);
      setIsReserved(false);
      setIsUpdatable(false);
      setIsEditable(false);
      setIsSold(false);

      Swal.fire({
        position: "top-center",
        icon: "error",
        title: t("alerts.contract.addAlerts.error.title"),
        showConfirmButton: true,
        timer: 1500,
      });
    }
  }

  function editContract() {
    setIsUpdatable(true);
    setIsEditable(false);
  }

  function deleteContract() {
    setIsReserved(false);

    const API = `https://api.hirari-iq.com/api/contract/${contractId}`;
    Swal.fire({
      title: t("alerts.buildings.deleteAlerts.confirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("alerts.contract.deleteAlerts.confirmButtonText"),
      cancelButtonText: t("alerts.contract.deleteAlerts.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API, config)
          .then((response) => {
            goBack();
            Swal.fire(
              t("alerts.contract.deleteAlerts.success.title"),
              t("alerts.contract.deleteAlerts.success.message"),
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            setIsEditable(true);
            setIsReserved(true);
            Swal.fire(
              t("alerts.contract.deleteAlerts.error.title"),
              t("alerts.contract.deleteAlerts.error.message"),
              "error"
            );
          });
      }
    });
  }

  async function updateContract() {
    setIsEditable(true);
    const data = watch();
    const contractData = {
      owner_name: data.owner_name.toString(),
      phone_number: data.phone_number.toString(),
      contract_date: data.contract_date.toString(),
      apartment_price: data.apartment_price.toString(),
      total_payment_price: data.total_payment_price.toString(),
      pending_price: data.pending_price.toString(),
      contract_type: data.contract_type.toString(),
      buyer_address: data.buyer_address,
      buyer_card_id: data.buyer_card_id.toString(),
      apartment_description: data.apartment_description.toString(),
      apartment_id: apartmentId.toString(),
    };

    setContractData((prevData) => ({
      ...prevData,
      owner_name: contractData.owner_name,
      total_payment_price: contractData.total_payment_price,
      pending_price: contractData.pending_price,
      phone_number: contractData.phone_number,
      contract_type: contractData.contract_type,
      contract_date: contractData.contract_date,
      buyer_card_id: contractData.buyer_card_id,
      buyer_address: contractData.buyer_address,
      apartment_price: contractData.apartment_price,
    }));

    const API = `https://api.hirari-iq.com/api/contract/${contractId}`;
    try {
      await axios.put(API, contractData, config);
      setIsReserved(true);
      await waitForPdfButton();
      downloadPdf();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: t("alerts.contract.updateAlerts.success.title"),
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      setIsEditable(false);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: t("alerts.contract.updateAlerts.error.title"),
        showConfirmButton: true,
        timer: 1500,
      });
    }
  }

  async function waitForPdfButton() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const downloadPdfButton = document.getElementById(
          "pdf-download-button"
        );
        if (downloadPdfButton) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 200);
    });
  }

  useEffect(() => {
    if (contractData) {
      setApartmentNumber(contractData?.apartment_detail.apartment_number);
      setApartmentPrice(contractData?.apartment_price);
      setArea(contractData?.apartment_detail?.area);
      setFloorNumber(contractData?.apartment_detail?.floor_number);
      setContractDate(contractData?.contract_date);
      setOwnerName(contractData?.owner_name);
      setbuyerCardId(contractData?.buyer_card_id);
      setbuyerAddress(contractData?.buyer_address);
      setPhoneNumber(contractData?.phone_number);
      setTotalPaymentPrice(contractData?.total_payment_price);
      setPendingPrice(contractData?.pending_price);

      if (contractData?.apartment_detail.status === "onHold") {
        setIsOnHold(true);
      }
    }
  }, [contractData]);

  const memoizedData = useMemo(
    () => ({
      ownerName,
      contractDate,
      totalPaymentPrice,
      pendingPrice,
      phoneNumber,
      apartmentPrice,
      apartmentNumber,
      buildingName,
      floorNumber,
      area,
      buyerCardId,
      buyerAddress,
    }),
    [
      ownerName,
      contractDate,
      totalPaymentPrice,
      pendingPrice,
      phoneNumber,
      apartmentPrice,
      apartmentNumber,
      buildingName,
      floorNumber,
      area,
      buyerCardId,
      buyerAddress,
    ]
  );

  useEffect(() => {
    if (isSubmitted && memoizedData) {
      setTimeout(() => {
        downloadPdf();
      }, 200);
    }
  }, [memoizedData, isSubmitted]);

  function downloadPdf() {
    const downloadPdfButton = document.getElementById("pdf-download-button");
    if (downloadPdfButton) {
      downloadPdfButton.click();
    }
  }

  return (
    <Layout>
      <Card
        extra={
          "w-full h-full sm:overflow-auto px-5 mt-10 p-5 mt-10 max-w-[1800px] mx-auto"
        }
      >
        <header className="relative mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="text-lg text-black dark:text-white"
            >
              {language === "en" ? <BsArrowLeft /> : <BsArrowRight />}
            </button>
            <div className="text-xl font-semibold text-navy-700 dark:text-white">
              {t("contract")}
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-screen-lg ">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 gap-y-6 text-sm md:grid-cols-6">
                  <div className="md:col-span-4">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="owner_name"
                    >
                      {t("contractForm.ownerName")}
                    </label>
                    <Controller
                      name="owner_name"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.owner_name?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="phone_number"
                    >
                      {t("contractForm.phoneNumber")}
                    </label>
                    <Controller
                      name="phone_number"
                      control={control}
                      defaultValue="000000000"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="number"
                            className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.phone_number?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="buyer_address"
                    >
                      {t("contractForm.adress")}
                    </label>
                    <Controller
                      name="buyer_address"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                            placeholder=""
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.buyer_address?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="buyer_card_id"
                    >
                      {t("contractForm.idCardNumber")}
                    </label>
                    <Controller
                      name="buyer_card_id"
                      control={control}
                      defaultValue="0"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="number"
                            className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                            placeholder=""
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.buyer_card_id?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="contract_date"
                    >
                      {t("contractForm.contractDate")}
                    </label>
                    <Controller
                      name="contract_date"
                      control={control}
                      // defaultValue={getCurrentDate()}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="date"
                            className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                            placeholder=""
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.contract_date?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="total_payment_price"
                    >
                      {t("contractForm.totalPaymentPrice")}
                    </label>
                    <div className="mt-1 flex h-10 items-center rounded ">
                      <Controller
                        name="total_payment_price"
                        control={control}
                        defaultValue="0"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="number"
                              defaultValue="0"
                              className="flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                              disabled={isEditable || isOnHold}
                            />
                          </>
                        )}
                      />
                    </div>
                    <p className="mt-1 text-sm text-red-400">
                      {errors.total_payment_price?.message}
                    </p>{" "}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="apartment_price"
                    >
                      {t("contractForm.apartmentPrice")}
                    </label>
                    <div className="mt-1 flex h-10 items-center rounded ">
                      <Controller
                        name="apartment_price"
                        control={control}
                        defaultValue="0"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="number"
                              defaultValue="0"
                              className="flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                              disabled={isEditable || isOnHold}
                            />
                          </>
                        )}
                      />
                    </div>
                    <p className="mt-1 text-sm text-red-400">
                      {errors.apartment_price?.message}
                    </p>
                  </div>

                  <div className="md:col-span-1">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="pending_price"
                    >
                      {t("contractForm.pendingPrice")}
                    </label>
                    <Controller
                      name="pending_price"
                      control={control}
                      defaultValue="0"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="number"
                            defaultValue="0"
                            className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.pending_price?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="contract_type"
                    >
                      {t("contractForm.contractType")}
                    </label>
                    <Controller
                      name="contract_type"
                      control={control}
                      defaultValue="cash"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                          disabled={isEditable || isOnHold}
                        >
                          <option value="cash">Cash</option>
                          <option value="installment">Installment</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="apartment_description"
                    >
                      {t("contractForm.description")}
                    </label>
                    <Controller
                      name="apartment_description"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <textarea
                            {...field}
                            rows={4}
                            className="mt-1 flex w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                            disabled={isEditable || isOnHold}
                          />
                          <p className="mt-1 text-sm text-red-400">
                            {errors.apartment_description?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-2 text-right md:col-span-6">
                    <div className="inline-flex items-end">
                      <div
                        className={`border-slate-200 flex items-center gap-4 ${
                          language === "en" ? "justify-end" : "justify-start"
                        } rounded-b pt-5`}
                      >
                        {!isOnHold && (
                          <>
                            {!isReserved && (
                              <button
                                type="submit"
                                className="active:bg-emerald-600 hover:mySecondary mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                              >
                                {t("formButtons.submit")}
                              </button>
                            )}
                            {isUpdatable && !isEditable && (
                              <button
                                type="button"
                                className="active:bg-emerald-600 hover:mySecondary mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                                onClick={updateContract}
                              >
                                {t("formButtons.update")}
                              </button>
                            )}
                            {isEditable && isReserved && (
                              <button
                                type="button"
                                className="active:bg-emerald-600 hover:mySecondary mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                                onClick={editContract}
                              >
                                {t("formButtons.edit")}
                              </button>
                            )}
                            {isReserved && (
                              <button
                                type="button"
                                className="active:bg-emerald-600 mb-1 mr-1 rounded bg-red-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                                onClick={deleteContract}
                              >
                                {t("formButtons.delete")}
                              </button>
                            )}
                          </>
                        )}

                        {!isSold && (
                          <>
                            {!isOnHold ? (
                              <button
                                type="button"
                                className="active:bg-emerald-600 mb-1 mr-1 rounded bg-orange-500 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                                onClick={onHold}
                              >
                                {t("formButtons.hold")}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="active:bg-emerald-600 mb-1 mr-1 rounded bg-red-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                                onClick={unHold}
                              >
                                {t("formButtons.unHold")}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <div className="hidden">
        <PDFDownloadLink
          document={<Pdf contractPdfData={memoizedData} />}
          filename="contract"
        >
          {({ loading }) =>
            loading ? (
              <span className="text-white">Loading Document...</span>
            ) : (
              <button
                type="button"
                id="pdf-download-button"
                ref={downloadPdfRef}
              >
                Download Contract
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </Layout>
  );
}

export default Contract;
