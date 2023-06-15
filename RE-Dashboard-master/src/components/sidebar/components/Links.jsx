/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { useLanguageStore } from "App";
// chakra imports

export function SidebarLinks(props) {
  let location = useLocation();

  const { routes } = props;

  const activeRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const language = useLanguageStore(state=>state.language)

  const createLinks = (routes) => {
    return routes.map((route, index) => {
     
        return (
          <Link key={index} to={route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-700"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 mx-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-700"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div class={`absolute ${language === 'en' ? 'right-0' : 'left-0'} top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400`}/>
              ) : null}
            </div>
          </Link>
        );
     
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
