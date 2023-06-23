import { useLanguageStore } from "App";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import Swal from 'sweetalert2'

export default function NewBuilding({GetNewItem}) {
  const [showModal, setShowModal] = React.useState(false);


  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data =>{
    const API = 'https://api.hirari-iq.com/api/blocks';
  console.log(data);
    const PostData = () => {
      axios.post(API, {...data,level:"0"})
        .then(response => {
          GetNewItem(Math.random())
          if(response.status==201){
            console.log(response.status)
            console.log("add")
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: true,
              timer: 1500
            })
          }
        
          
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    PostData();
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
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white  outline-none focus:outline-none">
                {/*header*/}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-xl font-semibold dark:text-indigo-900"> {t("newBuilding.title")}</h3>
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
                        for="name"
                      >
                           {t("newBuilding.name")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                        for="number_of_floor"
                      >
                          {t("newBuilding.numberOfFloors")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                        for="apt_per_floor"
                      >
                         {t("newBuilding.numberOfApartmentsPerFloor")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                        for="description"
                      >
                      {t("newBuilding.description")}
                      </label>
                      <textarea
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Write a description for the building"
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
                    {t("formButtons.close")}
                  </button>
                  <button
                    className="active:bg-emerald-600 mr-1 mb-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  >
                     {t("formButtons.create")}
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