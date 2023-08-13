import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import DashboardPage from "pages/DashboardPage";
import UpdateNeed from "./views/needs/Pages/UpdateNeed";
import UpdateOrder from "./views/orders/pages/UpdateOrder";
import UpdateUser from "./views/users/pages/UpdateUser";
import Contract from "views/apartments/Pages/Contract";
import View from "views/apartments/Pages/View";
import Pdf from "views/apartments/components/Pdf";

export const useSearchStore = create((set) => ({
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
  resetSearchText: () => set({ searchText: "" }),
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  login: () => set(() => ({ isAuthenticated: true })),
  logout: () => set(() => ({ isAuthenticated: false })),
}));

export const useLanguageStore = create((set) => ({
  language: "en",
  changeLanguage: (language) => set(() => ({ language: language })),
}));

export const useItemsStore = create((set) => ({
  names: [],
  types: [],
  setItemNames: (names) => set(() => ({ names: names })),
  setItemTypes: (types) => set(() => ({ types: types })),
}));

export const useDarkModeStore = create((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const usePdfStore = create((set) => ({
  owner: "",
  contractDate: "",
  total: "",
  remainingMoney: "",
  phoneNumber: "",
  apartmentPrice: "",
  apartmentNumber: "",
  building: "",
  floor: "",
  area: "",
  setOwner: (owner) => set({ owner }),
  setContractDate: (contractDate) => set({ contractDate }),
  setTotal: (total) => set({ total }),
  setRemainingMoney: (remainingMoney) => set({ remainingMoney }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setApartmentPrice: (apartmentPrice) => set({ apartmentPrice }),
  setApartmentNumber: (apartmentNumber) => set({ apartmentNumber }),
  setBuilding: (building) => set({ building }),
  setFloor: (floor) => set({ floor }),
  setArea: (area) => set({ area }),
}));

const App = () => {
  const language = useLanguageStore((state) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const darkMode = useDarkModeStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buildings" element={<Buildings />} />
      <Route path="/Login" element={<Auth />} />
      <Route path="/buildings/update/:buildingId" element={<Updateblock />} />
      <Route path="buildings/:buildingId/apartments" element={<Apartments />} />
      <Route
        path="buildings/:buildingId/apartments/:apartmentId/details"
        element={<View />}
      />
      <Route
        path="buildings/:buildingId/apartments/:apartmentId/contract"
        element={<Contract />}
      />
      <Route path="/needs" element={<Needs />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/update/:itemId" element={<UpdateItem />} />
      <Route path="/items/delete/:itemId" element={<DeleteItem />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/users" element={<Users />} />
      <Route path="/needs/update/:needId" element={<UpdateNeed />} />
      <Route path="/users/update/:useId" element={<UpdateUser />} />
      <Route path="/orders/update/:orderId" element={<UpdateOrder />} />
      <Route path="/download-pdf" element={<Pdf />} />
    </Routes>
  );
};

export default App;
