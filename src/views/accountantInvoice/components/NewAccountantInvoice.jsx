import { yupResolver } from "@hookform/resolvers/yup";
import { useLanguageStore } from "App";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import * as yup from "yup";

let accountantInvoiceSchema = yup.object({
  invoice_item_name: yup.string().required("Item Invoice is required"),
  invoice_date: yup.string().required("Invoice Date is required"),
  invoice_price: yup
    .number()
    .required("Invoice Price is required")
    .min(1, "Invoice Price must be greater than or equal to 1"),
  invoice_remaining_price: yup
    .number()
    .required("Invoice Remaining Price is required")
    .min(1, "Invoice Remaining Price must be greater than or equal to 0"),
  para_wargr_name: yup.string().required("Money Receiver is required"),
  // para_dar_name: yup.string().required("Payer is required"),
  invoice_type: yup.string().required("Invoice Type is required"),
});

export default function NewAccountantInvoice({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(accountantInvoiceSchema) });

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  let role = usr?.role;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const submitNewAccountant = (data) => {
    let item = invoiceItems.filter(
      (invoiceItem) => invoiceItem.invoice_item_name === data.invoice_item_name
    );

    const modifiedData = {
      invoice_item_id: item[0].invoice_item_id,
      invoice_date: data.invoice_date,
      invoice_price: data.invoice_price.toString(),
      invoice_remaining_price: data.invoice_remaining_price.toString(),
      para_wargr_name: data.para_wargr_name,
      para_dar_name: usr.name,
      invoice_type: data.invoice_type,
      is_approved: "0",
    };

    const API = "https://api.hirari-iq.com/api/invoice/accountant";
    axios
      .post(API, modifiedData, config)
      .then((response) => {
        console.log(response);
        GetNewItem(Math.random());
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: t("alerts.itemInvoice.addAlerts.success.title"),
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: t("alerts.itemInvoice.addAlerts.error.title"),
          showConfirmButton: true,
          timer: 1500,
        });
      });

    setShowModal(false);
    reset();
  };

  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    getItemInvoices();
  }, []);

  async function getItemInvoices() {
    const API = "https://api.hirari-iq.com/api/invoice/item";
    try {
      let res = await axios(API, config);
      let itemInvoices = res.data.data;
      itemInvoices.forEach((itemInvoice) => {
        setInvoiceItems((prev) => [
          ...prev,
          {
            invoice_item_id: itemInvoice.id,
            invoice_item_name: itemInvoice.invoice_item_name,
          },
        ]);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {role === "accountant" && (
        <button
          className="rounded-xs rounded-md bg-gray-200 dark:bg-white dark:text-blue-800"
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <BsPlus fontSize={32} />
        </button>
      )}

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-full max-w-[1000px] p-4 ">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none dark:bg-myCard">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t py-5 px-7">
                  <h3 className="text-xl font-semibold dark:text-[#778da9]">
                    {" "}
                    {t("accountantInvoiceTable.new")}
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
                    onSubmit={handleSubmit(submitNewAccountant)}
                    className="mb-6 p-5"
                  >
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 gap-4 gap-y-6 text-sm md:grid-cols-6">
                        <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="invoice_item_name"
                          >
                            {t(
                              "accountantInvoiceTable.fields.invoice_item_name"
                            )}
                          </label>
                          <Controller
                            name="invoice_item_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <select
                                {...field}
                                className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                              >
                                {invoiceItems.map((item) => (
                                  <option
                                    key={item.invoice_item_id}
                                    value={item.invoice_item_name}
                                  >
                                    {item.invoice_item_name}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="invoice_date"
                          >
                            {t("accountantInvoiceTable.fields.invoice_date")}
                          </label>
                          <Controller
                            name="invoice_date"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="date"
                                  className="mt-1 h-10 w-full rounded border border-indigo-600 bg-white px-4 dark:border-none dark:bg-myBlak"
                                  placeholder=""
                                />
                                <p className="mt-1 text-sm text-red-400">
                                  {errors.invoice_date?.message}
                                </p>
                              </>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="invoice_price"
                          >
                            {t("accountantInvoiceTable.fields.invoice_price")}
                          </label>
                          <Controller
                            name="invoice_price"
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
                                />
                                <p className="mt-1 text-sm text-red-400">
                                  {errors.invoice_price?.message}
                                </p>
                              </>
                            )}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="invoice_remaining_price"
                          >
                            {t(
                              "accountantInvoiceTable.fields.invoice_remaining_price"
                            )}
                          </label>
                          <div className="mt-1 flex h-10 items-center rounded ">
                            <Controller
                              name="invoice_remaining_price"
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
                                  />
                                </>
                              )}
                            />
                          </div>
                          <p className="mt-1 text-sm text-red-400">
                            {errors.invoice_remaining_price?.message}
                          </p>{" "}
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="apartment_price"
                          >
                            {t("accountantInvoiceTable.fields.para_wargr_name")}
                          </label>
                          <Controller
                            name="para_wargr_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                                />
                                <p className="mt-1 text-sm text-red-400">
                                  {errors.para_wargr_name?.message}
                                </p>
                              </>
                            )}
                          />
                        </div>

                        {/* <div className="md:col-span-2">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="pending_price"
                          >
                            {t("accountantInvoiceTable.fields.para_dar_name")}
                          </label>

                          <Controller
                            name="para_dar_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className="flex items-center w-full h-10 px-4 mt-1 transition-all bg-white border border-indigo-600 rounded dark:border-none dark:bg-myBlak"
                                />
                                <p className="mt-1 text-sm text-red-400">
                                  {errors.para_dar_name?.message}
                                </p>
                              </>
                            )}
                          />
                        </div> */}
                        <div className="md:col-span-1">
                          <label
                            className="font-medium text-gray-900 dark:text-white"
                            htmlFor="invoice_type"
                          >
                            {t("accountantInvoiceTable.fields.invoice_type")}
                          </label>
                          <Controller
                            name="invoice_type"
                            control={control}
                            defaultValue="outgoing"
                            rules={{ required: true }}
                            render={({ field }) => (
                              <select
                                {...field}
                                className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                              >
                                <option value="outgoing">Outgoing</option>
                                <option value="income">Income</option>
                                <option value="salary">Salary</option>
                              </select>
                            )}
                          />
                        </div>

                        <div className="mt-2 text-right md:col-span-6">
                          <div className="inline-flex items-end">
                            <div
                              className={`border-slate-200 flex items-center gap-4 ${
                                language === "en"
                                  ? "justify-end"
                                  : "justify-start"
                              } rounded-b pt-5`}
                            >
                              <button className="active:bg-emerald-600 hover:mySecondary mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none">
                                {t("formButtons.submit")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
