import Layout from 'Layout'
import React from 'react'
import Card from 'components/card'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from 'App';
import { Link, useParams } from 'react-router-dom';
import useFetchItems from 'hooks/useFetchItems';
import { useMemo,useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function UpdateNeed() {
  const [showModal, setShowModal] = React.useState(false);
  const [itemNames,setNames]=useState([]);
  const [itemTypes,setTypes]=useState([]);
  const [buildingID,setBuildingId]=useState(null);
  const [itemID,setItemID]=useState(null);
  const [buildingName,setBuildingNames]=useState([]);
  const {needId}=useParams();

  const navigate=useNavigate();
   const {Data}=useFetchItems();
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
    fetchData();
  }, [Data]);
  const API = "https://api.hirari-iq.com/api/blocks";
  const fetchData = () => {
    axios
      .get(API)
      .then((response) => {
        const newBuildingNames = [];
        response.data.data.forEach((block) => {
          console.log("resp ", response.data.data);
          if (block.is_deleted !== 1) {
            newBuildingNames.push(block.name);
            setBuildingId(block.id);
          }
        });
        setBuildingNames(newBuildingNames);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  



  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("data",data);
    let itemName = data.item_name;
    let itemId;

    if(Data){
      Data.map(item=>{
        if(item.name === itemName){
         itemId = item.id
        }
      })
    }
    

    const API = `https://api.hirari-iq.com/api/needs/${needId}`;
  
    const PostData = () => {
      let newData={
        need_amount:data.need_amount,
        description:data.description,
        user_id:"1",
        block_id:buildingID,
        item_id:itemId
      }
      axios.put(API, newData)
        .then(response => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
            timer: 1500
          })
          navigate("/needs");
  

        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire({
            position: 'top-center',
            icon: 'failed',
            title: 'failed to save',
            showConfirmButton: true,
            timer: 1500
          })
  
        });
    };
    PostData();
    setShowModal(false);
    reset();
  };
  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);
  const memoizedItemTypes = useMemo(() => itemTypes, [itemTypes]);
  const memoizedBuildingName = useMemo(() => buildingName, [buildingName]);


  const {t} = useTranslation()
  const language = useLanguageStore(state=>state.language)

  return (
    <Layout>
        <Card extra={"w-full h-full sm:overflow-auto px-5 p-5"}>
        <h1 className='font-bold text-xl mb-10'>{t('updatePage.needs')}</h1>
        <form className="mb-4 rounded bg-white px-8 pt-6 pb-8"  onSubmit={handleSubmit(onSubmit)}>
                  
                  <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="need_amount"
                      >
                    {t("newNeed.need_amount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="need_amount"
                        name="need_amount"
                        type="text"
                        placeholder="Enter used amount"
                        {...register("need_amount", { required: true })}
                      />
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
                  <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        for="name"
                      >
                        {t("newNeed.item_name")}
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
                        {t("newNeed.item_type")}
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
                        {memoizedBuildingName && memoizedBuildingName.map((name)=>{
                          return(
                          <option value={name}>{name}</option>
                          )
                        })}
                      </select>
                    </div>
                  
                    {/*footer*/}
                    <div className={`border-slate-200 flex items-center ${language === 'en' ? 'justify-end' : 'justify-start' } rounded-b pt-5`}  >
                  <Link to="/needs"
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-medium uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {t("formButtons.close")}
                  </Link>
                  <button
                   className="active:bg-emerald-600 mr-1 mb-1 rounded bg-indigo-700 px-6 py-2 text-sm font-medium uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  >
                     {t("formButtons.update")}
                  </button>
                </div>
                  </form>
    </Card>
      </Layout>
  )
}

export default UpdateNeed