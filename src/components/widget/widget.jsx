import Card from "components/card";

const Widget = ({ icon, title, subtitle, hoverColor }) => {
  return (
    <Card extra="group flex-grow items-center flex-col overflow-hidden justify-center relative items-center rounded-[20px] h-[300px] ">
      <div
        className={` absolute  -top-7 -right-7 z-0  h-[60px] w-[60px] rounded-[20px] transition-all duration-500 ease-in-out group-hover:top-0 group-hover:right-0 group-hover:h-full group-hover:w-full `}
        style={{ backgroundColor: hoverColor }}
      ></div>
      <div className=" z-10 flex h-[90px] w-auto flex-row items-center">
        <div className="flex h-[80px] w-[80px]  p-3">{icon}</div>
      </div>

      <div className="z-10 mt-5 flex flex-col items-center justify-center">
        <p className="text-slate-700 font-dm text-lg font-medium">{title}</p>
        <h4 className="duration-400 text-xl font-bold text-myPrimary transition-colors group-hover:text-white dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
