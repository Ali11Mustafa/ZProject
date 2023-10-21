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

function UpdateItemInvoice() {
  const { itemInvoiceId } = useParams();
  const navigate = useNavigate();
  const [itemInvoices, setItemInvoices] = useState([]);

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
    const API = `https://api.hirari-iq.com/api/invoice/item/${itemInvoiceId}`;

    const PostData = () => {
      const needApproval = data.invoice_item_need_status ? "1" : "0";
      axios
        .put(API, { ...data, invoice_item_need_status: needApproval }, config)
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
    fetchItemInvoices();
  }, [itemInvoiceId]);

  const fetchItemInvoices = () => {
    axios
      .get(`https://api.hirari-iq.com/api/invoice/item`, config)
      .then((response) => {
        setItemInvoices(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (itemInvoices) {
      const invoice = itemInvoices.filter(
        (invoice) => invoice.id === itemInvoiceId
      );
      if (invoice[0]) {
        setValue("invoice_item_name", invoice[0].invoice_item_name);
        setValue(
          "invoice_item_need_status",
          invoice[0].invoice_item_need_status
        );
      }
    }
  }, [setValue, itemInvoices, itemInvoiceId]);

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
            {t("itemInvoiceTable.update")}
          </div>
        </div>
        <form
          className="mb-4 rounded px-8 pt-6 pb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-medium text-gray-700"
              htmlFor="invoice_item_name"
            >
              {t("itemInvoiceTable.fields.invoice_item_name")}
            </label>
            <input
              className="focus:shadow-outline w-full rounded px-3 py-2 leading-tight text-gray-700 shadow dark:bg-myBlak dark:text-white"
              id="invoice_item_name"
              type="text"
              placeholder="Enter name"
              name="invoice_item_name"
              {...register("invoice_item_name", { required: true })}
            />
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

export default UpdateItemInvoice;
