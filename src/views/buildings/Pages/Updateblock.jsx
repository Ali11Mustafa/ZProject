import Layout from 'Layout'
import React from 'react'
import Card from 'components/card'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from 'App';
import { Link, useParams } from 'react-router-dom';
import useFetchItems from 'hooks/useFetchItems';
import axios from 'axios';
import { updateBlock } from '../index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'




function UpdateBlock() {
  const {buildingId} = useParams()
  const navigate=useNavigate();

  const { register, handleSubmit, reset } = useForm();


  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/blocks/${buildingId}`;
  
    const PostData = () => {
      axios.put(API, {...data,user:1})
        .then(response => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
            timer: 1500
          })
          navigate("/");


        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'there is an error',
            showConfirmButton: true,
            timer: 1500
          })
        });
    };
  
    PostData();
    reset();
  };

  
  

  const {t} = useTranslation()
  const language = useLanguageStore(state=>state.language)

  return (
    <Layout>
        <Card extra={"w-full h-full sm:overflow-auto px-5 p-5"}>
        <h1 className='font-bold text-xl mb-10'>Update Block</h1>
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
                  <Link to={'/'}
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                  >
                    {t("formButtons.cancel")}
                  </Link>
                  <button
                    className="active:bg-emerald-600 mr-1 mb-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  >
                     {t("formButtons.create")}
                  </button>
                </div>
                  </form>
    </Card>
      </Layout>
  )
}

export default UpdateBlock;