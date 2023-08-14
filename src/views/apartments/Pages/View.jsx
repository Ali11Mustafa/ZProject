import Layout from "Layout";
import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { IoMdPaper } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import Contract from "./Contract";
import { FaBackspace } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

function View() {
  const isSold = false;
  const apartmentId = 1;
  const { buildingId } = useParams();

  const contractData = {
    owner_name: "Ali",
    phone_number: "123-456-7890",
    contract_date: "2023-08-10",
    apartment_number: "A301",
    total: "150000",
    apartment_price: "120000",
    remaining_money: "30000",
    buyerAddress:"Erbil/mamostayan",
    buyerIdNumber:"007621121"
  };

  const navigate = useNavigate();
  function goback() {
    navigate(-1);
  }

  return (
    <Layout>
      <div className="p-10">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 ">
          <button onClick={goback} className="mb-5 text-lg text-white">
            <IoArrowBackOutline />
          </button>
          <h1 className="mb-10 text-2xl font-semibold text-black dark:text-white">
            Apartment Details
          </h1>
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-3xl text-gray-800 dark:text-white">
              A102
            </span>
            <span className="text-gray-500">|</span>
            <span className="ml-2 text-gray-600">B-12</span>
          </div>
          <div className="mb-4">
            <p className="max-w-[60%] text-gray-700 dark:text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
              assumenda ex optio officiis veritatis unde perferendis harum,
              beatae eveniet excepturi corporis reiciendis porro eos veniam sit,
              quas aliquid sapiente molestiae nam modi quos, voluptatibus quidem
              pariatur. Sit adipisci maxime sint esse neque saepe animi minima,
              inventore dicta ipsum. Repellendus, eaque.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-start justify-start gap-3">
            <span className=" text-gray-700 dark:text-gray-400">Floor: 12</span>

            <span className=" text-gray-700 dark:text-gray-400">
              Area: 120 m<sup>2</sup>
            </span>
            <div className="item-center flex w-full justify-between ">
              {isSold ? (
                <span className=" text-red-600">Sold</span>
              ) : (
                <span className=" text-green-600">Available</span>
              )}
              {!isSold && (
                <div className="flex items-center gap-4">
                  <Link
                    to={`/buildings/${buildingId}/apartments/${apartmentId}/contract`}
                    className="-md flex items-center gap-2  rounded-sm bg-blue-500 px-4 py-1 text-white transition-all duration-200 hover:scale-105 "
                  >
                    <IoMdPaper />
                    <span>Contract</span>
                  </Link>
                  <button className="flex items-center gap-2 rounded-sm bg-indigo-500 px-4 py-1 text-white  transition-all duration-200 hover:scale-105  ">
                    <AiOutlineLock />
                    <span>Hold</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isSold && (
          <div className="container mt-10">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-400">
                Contract Details
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6 text-gray-900 dark:text-white">
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">Owner's Name</h3>
                <p>{contractData.owner_name}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">Phone Number</h3>
                <p>{contractData.phone_number}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">Contract Date</h3>
                <p>{contractData.contract_date}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">
                  Apartment's Number
                </h3>
                <p>{contractData.apartment_number}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">Total</h3>
                <p>${contractData.total}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">
                  Apartment's Price
                </h3>
                <p>${contractData.apartment_price}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-lg font-semibold">Remaining Money</h3>
                <p>${contractData.remaining_money}</p>
              </div>
            </div>
            <div className="mt-8 text-center">{/* Download PDF link */}</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default View;
