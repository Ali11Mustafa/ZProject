import Layout from 'Layout'
import React from 'react'
import Card from 'components/card'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from 'App';
import { useParams } from 'react-router-dom';
import useFetchItems from 'hooks/useFetchItems';
import axios from 'axios';
import { useState,useMemo,useEffect} from 'react';

function UpdateOrder() {

  const {orderId} = useParams()
  const {Data}=useFetchItems();


  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = React.useState(false);
  const [itemNames,setNames]=useState([]);
  const [itemTypes,setTypes]=useState([]);
  const [itemID,setItemID]=useState(null);

  const onSubmit = (data) => {
    const API = `https://api.hirari-iq.com/api/orders/${orderId}`;
  
    const PostData = () => {
      axios.put(API, {...data,user:1})
        .then(response => {
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    PostData();
    reset();
  };
  console.log(Data);
  //get Items
  useEffect(() => {
   if (Data) {
     Data.forEach((item) => {
       
     
       if (item.is_deleted !== 1) {
         
         setNames((previousNames) => [...previousNames, item.name]);
         setTypes((previousTypes) => [...previousTypes, item.type]);
         setItemID(item.id);
         
       }
     });
   }
 }, [Data]);
 
  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);
  const memoizedItemTypes = useMemo(() => itemTypes, [itemTypes]);
  const {t} = useTranslation()
  const language = useLanguageStore(state=>state.language)

  return (
    <Layout>
        <Card extra={"w-full h-full sm:overflow-auto px-5 p-5"}>
        <h1 className='font-bold text-xl mb-10'>Update Item</h1>
        <form className="mb-4 rounded bg-white px-8 pt-6 pb-8"  onSubmit={handleSubmit(onSubmit)}>
                  
                  <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="amount"
                      >
                    {t("newNeed.need_amount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter used amount"
                        {...register("amount", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="type"
                      >
                        {t("newNeed.type")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="unit"
                        name="unit"
                        {...register("unit", { required: true })}
                      >
                       <option value="">Select a type</option>

                       <option value="ton">ton</option>
                       <option value="m">m</option>
                       <option value="m2">m2</option>
                       <option value="m3">m3</option>
                       <option value="barrel">barrel</option>
                          
                        
                        
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="price"
                      >
                        {t("newNeed.description")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="price"
                        name="price"
                        type="number"
                        placeholder="price"
                        {...register("price", { required: true })}
                      />
                    </div>
                  <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="name"
                      >
                        {t("newNeed.name")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="name"
                        name="name"
                        type="string"
                        {...register("name", { required: true })}
                      >
                             <option value="">Select a name</option>

                        {memoizedItemNames && memoizedItemNames.map((name)=>{
                          return(
                          <option value={name}>{name}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="type"
                      >
                        {t("newNeed.type")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="type"
                        name="type"
                        {...register("type", { required: true })}
                      >
                       <option value="">Select a type</option>

                         {memoizedItemTypes && memoizedItemTypes.map((type)=>{
                          return(
                          <option value={type}>{type}</option>
                          )
                        })}
                        
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

export default UpdateOrder