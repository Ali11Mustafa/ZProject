import React, { useEffect } from "react";
import { Routes, Route  } from "react-router-dom";
  
import Apartments from "pages/Apartments";
import { create } from "zustand";
import Buildings from "pages/Buildings";
import Auth from "pages/Auth";
import Needs from "pages/Needs";
import Items from "pages/Items";
import { useTranslation } from "react-i18next";


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


const App = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const language = useLanguageStore((state)=>state.language)

  const {i18n} = useTranslation()

  useEffect(()=>{
    i18n.changeLanguage(language)
  }, [language, i18n])

  


  if(!isAuthenticated){
    return <Auth/>
  }
  return (
    <Routes> 
      <Route path="/" element={<Buildings />} /> 
      <Route path="/apartments/:buildingId" element={<Apartments />} /> 
      <Route path="/needs" element={<Needs />} /> 
      <Route path="/items" element={<Items />} /> 
    </Routes>
  );
};

export default App;
