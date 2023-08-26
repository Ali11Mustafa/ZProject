import { useApartmentsAnaylyticsStore } from "App";
import { useEffect, useState } from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#c4a700"];

const ApartmentsAnalytics = () => {
  const [pieChartData, setPieChartData] = useState();

  const apartmentsAnalyticsData = useApartmentsAnaylyticsStore(
    (state) => state.apartmentsAnalyticsData
  );

  useEffect(() => {
    if (apartmentsAnalyticsData) {
      setPieChartData(apartmentsAnalyticsData?.data?.slice(1));
    }
  }, [apartmentsAnalyticsData]);

  return (
    <>
      {pieChartData && (
        <div className="flex flex-col items-center md:mr-16 md:flex-row">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart throttleDelay={3000}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="none"
                stroke="#33c4f0"
                strokeWidth={2}
                label={(entry) => entry.name}
                labelLine={false}
                className="overflow-visible"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  value={`Total: ${apartmentsAnalyticsData?.data[0].value}`}
                  position="center"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex w-[80%] flex-col justify-center md:w-[40%]">
            {pieChartData.map((entry, index) => (
              <div
                key={`bullet-${index}`}
                className="mb-[8px] flex items-center rounded-md bg-white p-[8px] dark:bg-myCard"
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: COLORS[index % COLORS.length],
                    marginLeft: "10px",
                    marginRight: "10px",
                    borderRadius: "20%",
                  }}
                  className={`h-[20px] w-[20px] bg-${
                    COLORS[index % COLORS.length]
                  } mx-[10px]`}
                />
                <div>
                  <p className="m-0 text-[16px] dark:text-white">
                    {entry.name}
                  </p>
                  <p className="m-0 text-[14px] text-[#888]">{`${entry.value} apartments`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApartmentsAnalytics;
