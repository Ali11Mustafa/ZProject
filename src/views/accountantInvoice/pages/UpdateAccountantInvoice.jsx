import { yupResolver } from "@hookform/resolvers/yup";
import { useLanguageStore } from "App";
import Layout from "Layout";
import axios from "axios";
import Card from "components/card";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
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
  para_dar_name: yup.string().required("Payer is required"),
  invoice_type: yup.string().required("Invoice Type is required"),
});

function UpdateAccountantInvoice() {
  const { accountantInvoiceId } = useParams();
  const navigate = useNavigate();
  const [itemInvoices, setItemInvoices] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(accountantInvoiceSchema) });
  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/invoice/accountant/${accountantInvoiceId}`;

    const PostData = () => {
      let item = invoiceItems.filter(
        (invoiceItem) =>
          invoiceItem.invoice_item_name === data.invoice_item_name
      );

      const modifiedData = {
        invoice_item_id: item[0]?.invoice_item_id,
        invoice_date: data.invoice_date,
        invoice_price: data.invoice_price.toString(),
        invoice_remaining_price: data.invoice_remaining_price.toString(),
        para_wargr_name: data.para_wargr_name,
        para_dar_name: data.para_dar_name,
        invoice_type: data.invoice_type,
        is_approved: accountantInvoices?.is_approved,
      };
      axios
        .put(API, modifiedData, config)
        .then((response) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: t("alerts.itemInvoice.updateAlerts.success.title"),
            showConfirmButton: true,
            timer: 1500,
          });
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: t("alerts.itemInvoice.updateAlerts.error.title"),
            showConfirmButton: true,
            timer: 1500,
          });
        });
    };

    PostData();
    reset();
  };
  useEffect(() => {
    fetchAccountantInvoices();
  }, [accountantInvoiceId]);

  const [invoiceItems, setInvoiceItems] = useState([]);

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

  const [accountantInvoices, setAccountantInvoices] = useState([]);

  const fetchAccountantInvoices = () => {
    axios
      .get(`https://api.hirari-iq.com/api/invoice/accountant`, config)
      .then((response) => {
        setAccountantInvoices(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (itemInvoices) {
      const invoice = itemInvoices.filter(
        (invoice) => invoice.id === accountantInvoiceId
      );
      if (invoice[0]) {
        setValue("invoice_item_name", invoice[0].invoice_item_name);
        setValue(
          "invoice_item_need_status",
          invoice[0].invoice_item_need_status
        );
      }
    }
  }, [setValue, itemInvoices, accountantInvoiceId]);

  useEffect(() => {
    if (accountantInvoices) {
      const invoice = accountantInvoices.filter(
        (invoice) => invoice.id === accountantInvoiceId
      );
      if (invoice[0]) {
        setValue(
          "invoice_item_name",
          invoice[0].invoice_item.invoice_item_name
        );
        setValue("para_dar_name", invoice[0].para_dar_name);
        setValue("para_wargr_name", invoice[0].para_wargr_name);
        setValue("invoice_type", invoice[0].invoice_type);
        setValue("invoice_price", invoice[0].invoice_price);
        setValue("invoice_date", invoice[0].invoice_date);
        setValue("invoice_remaining_price", invoice[0].invoice_remaining_price);
      }
    }
  }, [accountantInvoices]);

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
            {t("accountantInvoiceTable.update")}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-5">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 gap-y-6 text-sm md:grid-cols-6">
              <div className="md:col-span-2">
                <label
                  className="font-medium text-gray-900 dark:text-white"
                  htmlFor="invoice_item_name"
                >
                  {t("accountantInvoiceTable.fields.invoice_item_name")}
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
                  {t("accountantInvoiceTable.fields.invoice_remaining_price")}
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

              <div className="md:col-span-2">
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
                        className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                      />
                      <p className="mt-1 text-sm text-red-400">
                        {errors.para_dar_name?.message}
                      </p>
                    </>
                  )}
                />
              </div>
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
                    <>
                      <select
                        {...field}
                        className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-white px-4 transition-all dark:border-none dark:bg-myBlak"
                      >
                        <option value="outgoing">Outgoing</option>
                        <option value="income">Income</option>
                        <option value="salary">Salary</option>
                        <option value="Receptor">Recepter</option>
                      </select>
                      <p className="mt-1 text-sm text-red-400">
                        {errors.invoice_type?.message}
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
                    <button
                      type="submit"
                      className="active:bg-emerald-600 hover:mySecondary mb-1 mr-1 rounded bg-myPrimary px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                    >
                      {t("formButtons.submit")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default UpdateAccountantInvoice;
