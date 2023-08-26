import Apartments from "pages/Apartments";
import Auth from "pages/Auth";
import Buildings from "pages/Buildings";
import DashboardPage from "pages/DashboardPage";
import Items from "pages/Items";
import Needs from "pages/Needs";
import Orders from "pages/Orders";
import Users from "pages/Users";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Contract from "views/apartments/Pages/Contract";
import UpdateApartment from "views/apartments/Pages/UpdateApartment";
import Pdf from "views/apartments/components/Pdf";
import Updateblock from "views/buildings/Pages/Updateblock";
import UpdateItem from "views/items/pages/UpdateItem";
import { create } from "zustand";
import UpdateNeed from "./views/needs/Pages/UpdateNeed";
import UpdateOrder from "./views/orders/pages/UpdateOrder";
import UpdateUser from "./views/users/pages/UpdateUser";

export const useApartmentsAnaylyticsStore = create((set) => ({
  apartmentsAnalyticsData: {
    totalApartments: 0,
    soldApartments: 0,
    availableApartments: 0,
    onHoldApartments: 0,
  },

  setApartmentsAnalyticsData: (data) =>
    set(() => ({
      apartmentsAnalyticsData: {
        ...data,
      },
    })),
}));

export const useUserConfigStore = create((set) => ({
  userConfig: JSON.parse(localStorage.getItem("userConfig")) || {},
  // setUserConfig: (config) => set({ userConfig: config }),
  setUserConfig: (config) => {
    // Update the userConfig in the store
    set({ userConfig: config });

    // Store the config in localStorage
    localStorage.setItem("userConfig", JSON.stringify(config));
  },
}));

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
  language: localStorage.getItem("language") || "en",
  changeLanguage: (language) =>
    set(() => {
      localStorage.setItem("language", language);
      return { language: language };
    }),
}));

export const useItemsStore = create((set) => ({
  names: [],
  types: [],
  setItemNames: (names) => set(() => ({ names: names })),
  setItemTypes: (types) => set(() => ({ types: types })),
}));

export const useDarkModeStore = create((set) => ({
  isDarkMode: JSON.parse(localStorage.getItem("darkMode")) ?? true,

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return { isDarkMode: newDarkMode };
    });
  },
}));
export const usePdfStore = create((set) => ({
  ownerName: "",
  contractDate: "",
  totalPaymentPrice: "",
  pendingPrice: "",
  phoneNumber: "",
  apartmentPrice: "",
  apartmentNumber: "",
  buildingName: "",
  floorNumber: "",
  area: "",
  buyerCardId: "",
  buyerAddress: "",

  setOwnerName: (name) => set({ ownerName: name }),
  setContractDate: (date) => set({ contractDate: date }),
  setTotalPaymentPrice: (total) => set({ totalPaymentPrice: total }),
  setPendingPrice: (pendingPrice) => set({ pendingPrice: pendingPrice }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber }),
  setApartmentPrice: (apartmentPrice) =>
    set({ apartmentPrice: apartmentPrice }),
  setApartmentNumber: (apartmentNumber) =>
    set({ apartmentNumber: apartmentNumber }),
  setBuildingName: (buildingName) => set({ buildingName: buildingName }),
  setFloorNumber: (floorNumber) => set({ floorNumber: floorNumber }),
  setArea: (area) => set({ area }),
  setbuyerCardId: (buyerCardId) => set({ buyerCardId: buyerCardId }),
  setbuyerAddress: (buyerAddress) => set({ buyerAddress: buyerAddress }),
}));

const App = () => {
  const language = useLanguageStore((state) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    if (language !== "en") {
      document.querySelector("html").style.fontFamily = "Rudaw";
    } else {
      document.querySelector("html").style.fontFamily = "Nunito";
    }
  }, [language, i18n]);

  useEffect(() => {
    useLanguageStore.setState({
      language: localStorage.getItem("language") || "en",
    });
  }, []);

  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const userConfig = useUserConfigStore((state) => state.userConfig);

  useEffect(() => {
    console.log(userConfig);
  }, [userConfig]);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buildings" element={<Buildings />} />
      <Route path="/Login" element={<Auth />} />
      <Route path="/buildings/update/:buildingId" element={<Updateblock />} />
      <Route path="buildings/:buildingId/apartments" element={<Apartments />} />
      <Route
        path="buildings/:buildingId/apartments/:apartmentId/contract"
        element={<Contract />}
      />
      <Route
        path="buildings/:buildingId/apartments/:apartmentId/update"
        element={<UpdateApartment />}
      />
      <Route path="/needs" element={<Needs />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/update/:itemId" element={<UpdateItem />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/users" element={<Users />} />
      <Route path="/needs/update/:needId" element={<UpdateNeed />} />
      <Route path="/users/update/:userId" element={<UpdateUser />} />
      <Route path="/orders/update/:orderId" element={<UpdateOrder />} />
      <Route path="/download-pdf" element={<Pdf />} />
    </Routes>
  );
};

export default App;
