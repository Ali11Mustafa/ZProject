import { useLanguageStore, usePdfStore } from "App";
import Layout from "Layout";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import Pdf from "../components/Pdf";
import { saveAs } from "file-saver";
import axios from "axios";
import { useMemo } from "react";
import Card from "components/card";

function Contract() {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const navigate = useNavigate();
  const { apartmentId } = useParams();
  const { handleSubmit, control, setValue, watch } = useForm({
    shouldUnregister: false,
  });

  const [isReserved, setIsReserved] = useState(false);
  const [contractData, setContractData] = useState(null);

  const [isUpdatable, setIsUpdatable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const downloadPdfRef = useRef();
  const [contractId, setContractId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    console.log(contractData);

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
      }
    } catch (error) {
      setIsSubmitted(false);
      setIsReserved(false);
      setIsUpdatable(false);
      setIsEditable(false);
      console.error(error);
    }
  }

  function editContract() {
    setIsUpdatable(true);
    setIsEditable(false);
  }

  function deleteContract() {
    setIsReserved(false);

    const API = `https://api.hirari-iq.com/api/contract/${contractId}`;
    axios
      .delete(API, config)
      .then((response) => {
        console.log("deleted successfully");
        goBack();
      })
      .catch((error) => {
        console.error(error);
        setIsEditable(true);
        setIsReserved(true);
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
      console.log("updated successfully");
      await waitForPdfButton();
      downloadPdf();
    } catch (error) {
      console.error(error);
      setIsEditable(false);
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
            <button onClick={goBack} className="text-lg text-white">
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
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                          disabled={isEditable}
                        />
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
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                          disabled={isEditable}
                        />
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
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                          placeholder=""
                          disabled={isEditable}
                        />
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
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                          placeholder=""
                          disabled={isEditable}
                        />
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
    defaultValue=""
    render={({ field }) => (
      <input
        type="date" 
        {...field}
        className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
        placeholder=""
      />
    )}
  />
</div>

                  <div className="md:col-span-3">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="apartment_number"
                    >
                      {t("contractForm.apartmentNumber")}
                    </label>
                    <Controller
                      name="apartment_number"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                          placeholder=""
                          disabled={isEditable}
                        />
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
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
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                            disabled={isEditable}
                          />
                        )}
                      />
                    </div>
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
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                            disabled={isEditable}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="pending_price"
                    >
                      {t("contractForm.pendingPrice")}
                    </label>
                    <Controller
                      name="pending_price"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                          disabled={isEditable}
                        />
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
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
                      render={({ field }) => (
                        <select
                          {...field}
                          className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                          disabled={isEditable}
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
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={4}
                          className="mt-1 flex w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                          disabled={isEditable}
                        />
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
