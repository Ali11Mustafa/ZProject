import { useLanguageStore } from "App";
import React,{useState,useEffect,useMemo}from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import Swal from 'sweetalert2'

import { useItemsStore } from "App";
import useFetchItems from "hooks/useFetchItems";

export default function NewOrders({GetNewItem}) {
  const [showModal, setShowModal] = React.useState(false);
  const [itemNames,setNames]=useState([]);
  const [itemTypes,setTypes]=useState([]);
  const [buildingID,setBuildingId]=useState(null);
  const [itemID,setItemID]=useState(null);

  const [buildingName,setBuildingNames]=useState([]);
  const API = 'https://api.hirari-iq.com/api/orders';
  let usr = JSON.parse(sessionStorage.getItem('user'));
        let userName = usr?.fullname;
        let email = usr?.email;
        let role = usr?.role;
        let usrId = usr?.id;
        let token = usr?.token;

        console.log("ROLE", role)
      
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

   const {Data}=useFetchItems();
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
  



  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    let itemName = data.item_name;
    let itemId;

    if(Data){
      Data.map(item=>{
        if(item.name === itemName){
         itemId = item.id
        }
      })
    }
    
    const PostData = () => {
      let newData={
        amount:data.amount,
        unit:data.unit,
        price:data.price,
        user_id:usrId,
        item_id:itemId
      }
      console.log("New Data",newData);
      axios.post(API, newData,config)
        .then(response => {
          GetNewItem(Math.random());
            console.log(response.status)
            console.log("add")
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
  const memoizedItemNames = useMemo(() => itemNames, [itemNames]);
  const memoizedItemTypes = useMemo(() => itemTypes, [itemTypes]);
  const memoizedBuildingName = useMemo(() => buildingName, [buildingName]);

  
  return (
    <>
      {usr.role === "admin" && (
        <button
          className="rounded-xs bg-gray-200 dark:bg-white dark:text-blue-800 rounded-md"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlus fontSize={32} />
        </button>
      )}
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden shadow-xl outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[90%] max-w-xl">
              {/* Content */}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="border-slate-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-xl font-semibold dark:text-indigo-900">
                    {t("newOrder.title")}
                  </h3>
                  <button
                    className={`bg-transparent text-red-500 ${
                      language !== "en"
                        ? "float-left mr-auto"
                        : "float-right ml-auto"
                    } border-0 p-1 text-xl font-semibold`}
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/* Body */}
                <div>
                  <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="amount"
                      >
                        {t("newOrder.order_amount")}
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter amount"
                        {...register("amount", { required: true })}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-medium text-gray-700"
                        htmlFor="unit"
                      >
                        {t("newOrder.order_unit")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="unit"
                        name="unit"
                        {...register("unit", { required: true })}
                      >
                        <option value="">Select a unit</option>
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
                        htmlFor="price"
                      >
                        {t("newOrder.order_price")}
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
                        htmlFor="name"
                      >
                        {t("newOrder.item_name")}
                      </label>
                      <select
                        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        id="item_name"
                        name="item_name"
                        type="string"
                        {...register("item_name", { required: true })}
                      >
                        <option value="">Select a name</option>
                        {memoizedItemNames &&
                          memoizedItemNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="border-slate-200 flex items-center">
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
      )}
    </>
  );
  
  
    
   
}
