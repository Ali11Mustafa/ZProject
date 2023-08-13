import { useLanguageStore, usePdfStore } from "App";
import Layout from "Layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

function Contract() {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm({
    shouldUnregister: false,
  });

  const pdfStore = usePdfStore();

  const formData = watch();

  const handleDownloadPDF = () => {
    // Setting the data in the store
    pdfStore.setOwner(formData.owner_name);
    pdfStore.setContractDate(formData.contract_date);
    pdfStore.setTotal(formData.total);
    pdfStore.setRemainingMoney(formData.remaining_money);
    pdfStore.setPhoneNumber(formData.phone_number);
    pdfStore.setApartmentPrice(formData.apartment_price);

    // Open the link in a new tab
    navigate("/download-pdf");
  };

  useEffect(() => {
    const defaultDate = new Date();
    const formattedDefaultDate = defaultDate.toISOString().split("T")[0];
    const dateParts = formattedDefaultDate.split("-");
    const formattedDate = dateParts.join("/");
    setValue("contract_date", formattedDate);
    setValue("owner_name", "Ali Mustafa");
    setValue("total", "12000");
    setValue("remaining_money", "800");
    setValue("phone_number", "122-122-122-1122");
    setValue("apartment_number", "12E-T");
    setValue("apartment_price", "72000");
  }, []);

  function goBack() {
    navigate(-1);
  }

  function onSubmit(data) {}

  return (
    <Layout>
      {/* component */}
      <div className="flex items-center justify-center p-6">
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-400">
              Contract{" "}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 gap-y-6 text-sm md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="owner_name"
                    >
                      Owner's Name
                    </label>
                    <Controller
                      name="owner_name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-gray-50 px-4 dark:border-none"
                        />
                      )}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <Controller
                      name="phone_number"
                      control={control}
                      defaultValue=""
                      rules={{
                        pattern: {
                          value: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
                          message:
                            "Please enter your phone number in the format XXX-XXX-XXXX",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-gray-50 px-4 dark:border-none"
                        />
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="contract_date"
                    >
                      Contract Date
                    </label>
                    <Controller
                      name="contract_date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-gray-50 px-4 dark:border-none"
                          placeholder=""
                        />
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="apartment_number"
                    >
                      Apartment's Number
                    </label>
                    <Controller
                      name="apartment_number"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 h-10 w-full rounded border border-indigo-600 bg-gray-50 px-4 dark:border-none"
                          placeholder=""
                        />
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="total"
                    >
                      Total
                    </label>
                    <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                      <Controller
                        name="total"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="bg-transparent w-full appearance-none border border-indigo-600 bg-gray-50 px-4 text-gray-800 outline-none dark:border-none"
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
                      Apartment's Price
                    </label>
                    <div className="mt-1 flex h-10 items-center rounded border border-indigo-600 bg-gray-50 dark:border-none">
                      <Controller
                        name="apartment_price"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="bg-transparent w-full appearance-none px-4 text-gray-800 outline-none"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label
                      className="font-medium text-gray-900 dark:text-white"
                      htmlFor="remaining_money"
                    >
                      Remaining money
                    </label>
                    <Controller
                      name="remaining_money"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="mt-1 flex h-10 w-full items-center rounded border border-indigo-600 bg-gray-50 px-4 transition-all dark:border-none"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-6 text-right md:col-span-5">
                    <div className="inline-flex items-end">
                      <div
                        className={`border-slate-200 flex items-center ${
                          language === "en" ? "justify-end" : "justify-start"
                        } rounded-b pt-5`}
                      >
                        <button
                          onClick={handleDownloadPDF}
                          className="font-bold text-black dark:text-white"
                        >
                          download
                        </button>
                        <button
                          onClick={goBack}
                          className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        >
                          {t("formButtons.cancel")}
                        </button>
                        <button
                          type="submit"
                          className="active:bg-emerald-600 mb-1 mr-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                        >
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
    </Layout>
  );
}

export default Contract;
