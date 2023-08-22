import { useLanguageStore } from "App";
import Footer from "components/footer/Footer";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import React, { useEffect } from "react";

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(window.innerWidth >= 1000);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const language = useLanguageStore((state) => state.language);

  if (language === "en") {
    document.documentElement.dir = "ltr";
  } else {
    document.documentElement.dir = "rtl";
  }

  return (
    <div className="h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-gray-100 dark:!bg-myBlak">
        <main className={`mx-[20px] h-full flex-none  transition-all `}>
          <div
            className={`h-full ${language !== "en" ? "lg:mr-52" : "lg:ml-56"}`}
          >
            <Navbar onOpenSidenav={() => setOpen(true)} />
            <div className={`pt-5s  mb-auto h-full min-h-[84vh] p-2 md:pr-2 `}>
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
