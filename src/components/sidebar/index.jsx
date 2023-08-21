/* eslint-disable */

import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuthStore } from "App";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";
import Links from "./components/Links";
import { useNavigate } from "react-router-dom";

import logoImg from "../../assets/img/logo.png";
import useRoutes from "hooks/useRoutes";
import { TiTimes } from "react-icons/ti";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { routes } = useRoutes();

  const { t } = useTranslation();

  const logout = () => {
    sessionStorage.removeItem("user");

    navigate("/Login");
  };

  const language = useLanguageStore((state) => state.language);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let username = usr?.name;

  return (
    <div
      className={`sm:none linear shadow-whitesmoke/5 fixed !z-50 flex min-h-full w-full flex-col bg-white pb-10 shadow-xl transition-transform duration-200 dark:bg-myCard dark:text-white md:!z-50 md:w-fit lg:!z-50 xl:!z-0 ${
        language === "en" && open
          ? "translate-x-0"
          : language === "en" && !open
          ? "-translate-x-[30rem]"
          : ""
      }
      ${
        language !== "en" && open
          ? "-translate-x-0"
          : language !== "en" && !open
          ? "translate-x-[30rem]"
          : ""
      }
      `}
    >
      <span
        className={`absolute top-4 ${
          language === "en" ? "right-4" : "left-4"
        } block cursor-pointer lg:hidden`}
        onClick={onClose}
      >
        <TiTimes />
      </span>
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      ></span>

      <div className={`mx-auto flex   items-center md:mx-[56px]`}>
        <Link to="/" className="my-4">
          <img src={logoImg} alt="Z Tower" className="w-[100px] scale-125 " />
        </Link>
      </div>
      <div className="mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold text-black dark:text-white">
          {username}
        </h1>
        <button
          onClick={logout}
          className="mx-auto w-fit rounded-md border border-mySecondary px-4 py-1 font-medium transition-colors duration-200 ease-linear hover:bg-myPrimary hover:text-white"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
