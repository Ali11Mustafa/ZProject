import React from "react";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import { useLanguageStore } from "App";

export default function Layout({children}) {
  
  const [open, setOpen] = React.useState(true); 

  // Navbar
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1000 ? setOpen(false) : setOpen(true)
    );
  }, []);
 


  const language = useLanguageStore((state) => state.language);

  if(language === 'en'){
    document.documentElement.dir = "ltr";
  }
  else{
    document.documentElement.dir = "rtl";

  }


  return (
    <div className="h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900" >
        <main
          className={`mx-[20px] h-full flex-none transition-all md:pe-2`}
        >
          <div className={`h-full ${language !== 'en' ? 'lg:mr-52' : 'lg:ml-56'}`}>
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              
            />
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
