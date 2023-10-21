import { yupResolver } from "@hookform/resolvers/yup";
import { useLanguageStore } from "App";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import * as yup from "yup";

let itemInvoiceSchema = yup.object({
  invoice_item_name: yup.string().required("Item name is required"),
});
export default function NewInvoice({ GetNewItem }) {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemInvoiceSchema),
  });
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;
  let role = usr?.role;
  const onSubmit = (data) => {
    const API = "https://api.hirari-iq.com/api/invoice/item";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const PostData = () => {
      const needApproval = data.invoice_item_need_status ? "1" : "0";
      axios
        .post(API, { ...data, invoice_item_need_status: needApproval }, config)
        .then((response) => {
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
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.itemInvoice.addAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };
    PostData();
    setShowModal(false);
  };
  const language = useLanguageStore((state) => state.language);

  return (
    <>
      {role === "admin" && (
        <button
          className="rounded-xs rounded-md bg-gray-200 dark:bg-white dark:text-blue-800"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlus fontSize={32} />
        </button>
      )}

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-[90%] max-w-xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none dark:bg-myCard">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t py-5 px-7">
                  <h3 className="text-xl font-semibold dark:text-[#778da9]">
                    {" "}
                    {t("itemInvoiceTable.title")}
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
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8 dark:bg-myCard"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        htmlFor="invoice_item_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("itemInvoiceTable.fields.invoice_item_name")}
                      </label>
                      <input
                        type="text"
                        id="invoice_item_name"
                        className="focus:shadow-outline appearance-dark:none mb-4 w-full rounded bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-myBlak"
                        {...register("invoice_item_name", { required: true })}
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.invoice_item_name?.message}
                      </p>
                    </div>
                    <div className="mb-6 flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="invoice_item_need_status"
                          type="checkbox"
                          value={true}
                          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-mySecondary"
                          {...register("invoice_item_need_status")}
                        />
                      </div>
                      <label
                        htmlFor="invoice_item_need_status"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {t("itemInvoiceTable.fields.invoice_item_need_status")}
                      </label>
                    </div>

                    {/*footer*/}
                    <div
                      className={`border-slate-200 flex items-center ${
                        language === "en" ? "justify-end" : "justify-start"
                      } rounded-b pt-5`}
                    >
                      <button
                        className="background-transparent text-md mb-1 mr-1 px-6 py-2 font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        {t("formButtons.close")}
                      </button>
                      <button className="active:bg-emerald-600 mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none md:hover:bg-mySecondary">
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
