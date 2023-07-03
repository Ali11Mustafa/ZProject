import Layout from 'Layout'
import React from 'react'
import Card from 'components/card'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from 'App';
import { useParams } from 'react-router-dom';
import useFetchItems from 'hooks/useFetchItems';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function UpdateItem() {

  const {itemId} = useParams()
  const {Data}=useFetchItems();
  const navigate=useNavigate();



  const { register, handleSubmit, reset } = useForm();
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
  

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/items/${itemId}`;
  
    const PostData = () => {
      axios.put(API, {...data,user:usrId},config)
        .then(response => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
            timer: 1500
          })
          navigate("/items")

        }) 
        .catch(error => {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'something wrong',
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
        <h1 className='font-bold text-xl mb-10'>Update Item</h1>
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
                        <option value="15mm">15mm</option>
                        <option value="20mm">20mm</option>
                        <option value="25mm">25mm</option>
                      </select>
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

export default UpdateItem