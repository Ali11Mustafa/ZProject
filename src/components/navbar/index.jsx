import { useDarkModeStore, useLanguageStore, useSearchStore } from "App";
import LangSelector from "components/langSelector/LangSelector";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const Navbar = (props) => {
  const { onOpenSidenav } = props;

  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const { t } = useTranslation();

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  const language = useLanguageStore((state) => state.language);
  return (
    <nav
      className={`sticky top-4 z-40 flex  items-center  gap-2 rounded-xl bg-white p-2 shadow-md shadow-shadow-500 backdrop-blur-xl dark:bg-myCard md:mx-4 md:flex-row`}
    >
      <h1 className="mx-5 hidden text-xl font-bold text-black dark:text-white md:block">
        {t("zTower")}
      </h1>
      <div
        className={`relative mt-[3px] flex h-[61px] w-fit flex-grow items-center justify-between  gap-2 rounded-full py-2 dark:shadow-none  ${
          language === "en" ? "md:ml-auto" : "md:mr-auto"
        } md:flex-grow-0 md:gap-1 xl:gap-2`}
      >
        <div className="flex h-full flex-1 items-center rounded-full  text-navy-700 dark:text-white md:w-[300px]">
          <input
            type="text"
            placeholder={`${t("search")}...`}
            value={searchText}
            onChange={handleSearch}
            className=" block h-full rounded-full   border border-gray-400 px-4 text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-myCard dark:text-white  dark:placeholder:!text-white sm:w-fit md:!w-[300px]"
          />
        </div>

        <LangSelector />
        <button
          className="cursor-pointer px-2 text-gray-600"
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? (
            <RiSunFill
              className={`h-4 w-4 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            />
          ) : (
            <RiMoonFill
              className={`h-4 w-4 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            />
          )}
        </button>
        <button
          className="flex cursor-pointer px-2 text-xl text-gray-600 dark:text-white lg:hidden"
          onClick={onOpenSidenav}
        >
          <HiOutlineMenuAlt3 className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
