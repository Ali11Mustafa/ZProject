import { useLanguageStore } from "App";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";

export default function NewNeed() {
  const [showModal, setShowModal] = React.useState(false);


  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data =>{
    setShowModal(false)
    reset()
  };

  const {t} = useTranslation()

  const language = useLanguageStore(state=>state.language)


  return (
    <>
      <button
        className="rounded-xs bg-gray-200 dark:bg-white dark:text-blue-800 rounded-md "
        type="button"
        onClick={() => setShowModal(true)}
      >
        <BsPlus fontSize={32} />
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden shadow-xl outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-[90%] max-w-xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-xl font-semibold dark:text-indigo-900"> {t("newNeed.title")}</h3>
                  <button
                    className={`bg-transparent text-red-500 ${language !== 'en' ? 'float-left mr-auto' : 'float-right ml-auto'} border-0 p-1 text-xl font-semibold`}
                    onClick={() => setShowModal(false)}
                  >
                
                      ×
             
                  </button>
                </div>
                {/*body*/}
                <div>
                  <form className="mb-4 rounded bg-white px-8 pt-6 pb-8"  onSubmit={handleSubmit(onSubmit)}>
                  
          
                  <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="no_of_floors"
                      >
                        {t("newNeed.name")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="name"
                        name="name"
                        type="string"
                        {...register("amount_unit", { required: true })}
                      >
                        <option value="">Select the need</option>
                        <option value="Shisha, 20mm">Shisha, 20mm</option>
                        <option value="Shish, 15mm">Shish, 15mm</option>
                        <option value="Concreat, colim">Concreat, colim</option>
                        <option value="Concreat, slap">Concreat, slap</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="name"
                      >
                    {t("newNeed.usedAmount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="used_amount"
                        name="used_amount"
                        type="number"
                        pattern="[0-9]*"
                        placeholder="Enter used amount"
                        {...register("used_amount", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="no_of_floors"
                      >
                        {t("newNeed.building")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="building"
                        name="building"
                        type="string"
                        {...register("building", { required: true })}
                      >
                        <option value="">Select a Building</option>
                        <option value="Z1">Z1</option>
                        <option value="Z2">Z2</option>
                        <option value="Z3">Z3</option>
                        <option value="Z4">Z4</option>
                        <option value="Z5">Z5</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="description"
                      >
                        {t("newNeed.description")}
                      </label>
                      <textarea
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Write a description"
                        {...register("description", { required: true })}
                      />
                    </div>
                    {/*footer*/}
                    <div className={`border-slate-200 flex items-center ${language === 'en' ? 'justify-end' : 'justify-start' } rounded-b pt-5`}  >
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {t("newNeed.close")}
                  </button>
                  <button
                   className="active:bg-emerald-600 mr-1 mb-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  >
                     {t("newNeed.add")}
                  </button>
                </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black dark:bg-black opacity-30"></div>
        </>
      ) : null}
    </>
  );
}
