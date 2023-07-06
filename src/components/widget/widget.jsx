import Card from "components/card";

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="flex-grow items-center flex-col justify-center items-center rounded-[20px] h-[300px] w-auto  ">
      <div className=" flex h-[90px] w-auto flex-row items-center ">
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-indigo-300 p-3 text-3xl dark:bg-navy-700">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center">
        <p className="text-slate-700 font-dm text-lg font-medium">{title}</p>
        <h4 className="text-xl font-bold text-brand-500 dark:text-white">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;