import { useLanguageStore } from "App";
import React, { useEffect, useRef, useState } from "react";
import { IoLanguage } from "react-icons/io5"; 
import useLangs from "hooks/useLangs";
 

export default function LangSelector() {
  const { langsList } = useLangs();

  const [dropDown, setDropDown] = useState(false);
  const languageRef = useRef(null);

  const changeLanguage = useLanguageStore((state) => state.changeLanguage);
 

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  const showLanguagesHandler = () => {
    setDropDown(!dropDown);
  };

  const handleOutsideClick = (e) => {
    if (languageRef.current && !languageRef.current.contains(e.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [languageRef]);

  const language = useLanguageStore(state=>state.language)

  return (
    <div className="relative cursor-pointer px-2 leading-none text-gray-600 dark:text-white">
      <button onClick={showLanguagesHandler} ref={languageRef}>
        <IoLanguage />
      </button>

      {dropDown && (
        <div
          className={`absolute ${language === 'en' ? 'right-0' : 'left-0'}
            top-6 flex flex-col gap-2 rounded-[8px]  bg-white md:bg-blue p-5 font-medium text-black shadow-xl w-40`}
        >
          {langsList.map((lang) => {
            return (
              <button
                className={`flex items-center gap-3 rounded-[4px] ${lang.active && 'bg-gray-300'} p-2 hover:bg-gray-300`}
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
              >
                 <img src={lang.flag} alt="" width="18px" className="rounded-sm" />
                <p className="font-normal">{lang.name}</p>
              </button>
            );
          })}
          
        </div>
      )}
    </div>
  );
}
