/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguageStore } from "App";
import HomeSvg from "assets/icons/HomeSvg";
// chakra imports

export function SidebarLinks(props) {
  let location = useLocation();

  const { routes } = props;

  const activeRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const language = useLanguageStore((state) => state.language);

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      return (
        <Link key={index} to={route.path}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li
              className={`mx-4 flex h-full w-full cursor-pointer items-center py-2 px-4 ${
                activeRoute(route.path) === true
                  ? "rounded-md bg-myPrimary"
                  : ""
              }`}
              key={index}
            >
              <div className="flex !h-5 !w-5">{route.icon}</div>
              <p
                className={` mx-4 ${
                  activeRoute(route.path) === true
                    ? "font-bold text-white"
                    : "font-medium text-gray-700"
                }`}
              >
                {route.name}
              </p>
            </li>
            {/* {activeRoute(route.path) ? (
              <div
                className={`absolute ${
                  language === "en" ? "right-0" : "left-0"
                } top-px h-9 w-1 rounded-lg bg-myPrimary `}
              />
            ) : null} */}
          </div>
        </Link>
      );
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
