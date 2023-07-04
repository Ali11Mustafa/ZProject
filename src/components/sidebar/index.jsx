/* eslint-disable */

import { HiX } from "react-icons/hi"; 
import { Link } from "react-router-dom";
import {useAuthStore} from 'App'
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "App";
import Links from './components/Links'

import logoImg from '../../assets/img/logo.png';
import useRoutes from "hooks/useRoutes";
 
const Sidebar = ({ open, onClose }) => {

  const {routes} = useRoutes()

  const { t} = useTranslation();

  const logout = useAuthStore((state) => state.logout);

  const language = useLanguageStore(state=>state.language);

 
  
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${language === 'en' && open ? 'translate-x-0' : language === 'en' && !open ? '-translate-x-96' : ''}
      ${language !== 'en' &&  open ? '-translate-x-0' : language !== 'en' && !open ? 'translate-x-96' : ''}
      `}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px]   flex items-center`}>
        <Link to='/' className="mt-1 ml-1 h-fit font-nunito text-[26px] font-bold uppercase text-navy-700 dark:text-white">
        <img src={logoImg} alt="Z Tower" className="w-[100px]"/>
        </Link>
      </div> 
      <div class="mb-7 h-px bg-gray-300 dark:bg-white/30" />
      
 <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
      <button onClick={logout} className="border border-indigo-700 rounded-md w-fit mx-auto px-2 py-1 hover:bg-indigo-700 transition-colors duration-200 ease-linear hover:text-white font-medium">{t('logout')}</button>


    </div>
  );
};

export default Sidebar;