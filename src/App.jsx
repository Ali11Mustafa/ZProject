import React, { useEffect } from "react";
import { Routes, Route  } from "react-router-dom";
import Apartments from "pages/Apartments";
import { create } from "zustand";
import Buildings from "pages/Buildings";
import Auth from "pages/Auth"; 
import Needs from "pages/Needs";
import Items from "pages/Items";
import { useTranslation } from "react-i18next";
import UpdateItem from "views/items/pages/UpdateItem";
import DeleteItem from "views/items/pages/DeleteItem";
import Updateblock from "views/buildings/Pages/Updateblock";
import Orders from "pages/Orders";
import Users from "pages/Users";
import UpdateNeed from "./views/needs/Pages/UpdateNeed"
import UpdateOrder from "./views/orders/pages/UpdateOrder"
import UpdateUser from "./views/users/pages/UpdateUser"

export const useSearchStore = create((set) => ({
  searchText: '',
  setSearchText: (text) => set({ searchText: text }),
  resetSearchText: () => set({ searchText: "" }),
  
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  login: () => set(() => ({ isAuthenticated: true })),
  logout: () => set(() => ({ isAuthenticated: false })),
}));

export const useLanguageStore = create((set) => ({
  language: 'en',
  changeLanguage: (language) => set(() => ({ language: language })),
}));

export const useItemsStore = create((set) => ({
  names:[],
  types:[],
  setItemNames: (names) => set(() => ({ names: names })),
  setItemTypes: (types) => set(() => ({ types: types })),
}));



const App = () => {

  const isAuthenticated = useAuthStore((state) => sessionStorage.getItem('user') != null ? true
    : state.isAuthenticated);
  const language = useLanguageStore((state)=>state.language)
  const {i18n} = useTranslation()

  useEffect(()=>{
    i18n.changeLanguage(language)
  }, [language, i18n])


  // if(!isAuthenticated){
  //   return <Auth/>
  // } 

  return ( 
    <Routes>  
      <Route path="/" element={<Buildings />} /> 
      <Route path="/Login" element={<Auth />} /> 
      <Route path="/buildings/update/:buildingId" element={<Updateblock />} /> 
      <Route path="/apartments/:buildingId" element={<Apartments />} /> 
      <Route path="/needs" element={<Needs />} /> 
      <Route path="/items" element={<Items />} /> 
      <Route path="/items/update/:itemId" element={<UpdateItem />} /> 
      <Route path="/items/delete/:itemId" element={<DeleteItem />} /> 
      <Route path="/orders" element={<Orders />} /> 
      <Route path="/users" element={<Users/>} /> 
      <Route path="/needs/update/:needId" element={<UpdateNeed/>} />
      <Route path="/users/update/:useId" element={<UpdateUser/>} /> 
      <Route path="/orders/update/:orderId" element={<UpdateOrder/>} /> 
    </Routes>
  );
};

export default App;