import { useLanguageStore } from "App";
import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import Swal from 'sweetalert2'


export default function NewItem({GetNewItem}) {
  const [showModal, setShowModal] = React.useState(false);

  const { register, handleSubmit, reset } = useForm();


  const onSubmit = (data) => {
    let usr = JSON.parse(sessionStorage.getItem('user'));
    let userName = usr?.fullname;
    let email = usr?.email;
    let image = usr?.img;
    let usrId = usr?.id;
    let token = usr?.token;
  
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    

    const PostData = async() => {
      const API = 'https://api.hirari-iq.com/api/items';
    await  axios.post(API, {...data,user_id:usrId,config})
        .then(response => {

         GetNewItem(Math.random());
          console.log(response.status)
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
            timer: 1500
          })
        
      
         
  
        })
        .catch(error => {
                
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'there is another error',
              showConfirmButton: true,
            })
          
         
        });
    };
  
    PostData();
    setShowModal(false);
    reset();
  };
  
  

  const {t} = useTranslation()

  const language = useLanguageStore(state=>state.language)



  return (
    <>
      <button
        className="rounded-xs rounded-md bg-gray-200 dark:bg-white dark:text-blue-800 "
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
                  <h3 className="text-xl font-semibold dark:text-indigo-900">
                  {t("newItem.title")}
                  </h3>
                  <button
                    className={`bg-transparent text-red-500 ${language !== 'en' ? 'float-left mr-auto' : 'float-right ml-auto'} border-0 p-1 text-3xl font-semibold`}
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div>
                  <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                      <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="name"
                      >
                                 {t("newItem.name")}
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
                        for="no_of_floors"
                      >
                                 {t("newItem.type")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="type"
                        name="type"
                        type="string"
                        {...register("type", { required: true })}
                      >
                        <option value="">Select a unit</option>
                        <option value="10mm">10mm</option>
                        <option value="12mm">12mm</option>
                        <option value="20mm">20mm</option>
                        <option value="25mm">25mm</option>
                        <option value="flat">flat</option>
                        <option value="slab">slab</option>
                        <option value="column">column</option>
                        <option value="barrel">barrel</option>
                        <option value="tie">tie</option>



                      </select>
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
                    className="active:bg-emerald-600 mr-1 mb-1 rounded bg-indigo-700 px-6 py-3 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
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