import React from "react";
import { FiAlignJustify } from "react-icons/fi";

import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useSearchStore } from "App";
import { useTranslation } from "react-i18next";
import LangSelector from "components/langSelector/LangSelector";
 


const Navbar = (props) => {
  const { onOpenSidenav } = props;
  const [darkmode, setDarkmode] = React.useState(false);

    // zustand
    const searchText = useSearchStore((state) => state.searchText);
    const setSearchText = useSearchStore((state) => state.setSearchText);
    
    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
    
    const { t} = useTranslation() 
    

  return (
    <nav className={`sticky top-4 z-40 rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]  `}>
      {/* <div className="ml-[6px]">
        <p className="shrink text-xl  text-navy-700 dark:text-white font-[500] capitalize
hover:text-navy-700
dark:hover:text-white">
        
              {t('dashboard')}
       
        </p>
      </div> */}

      <div className="ml-auto relative mt-[3px] flex h-[61px] w-fit flex-grow items-center justify-between gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white flex-1">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder={`${t("search")}...`}
            value={searchText}
            onChange={handleSearch}
            class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        

        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
            <LangSelector/>
        <div
          className="cursor-pointer text-gray-600 px-2"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        

     
      </div >
     

      
    </nav>
  );
};

export default Navbar;
