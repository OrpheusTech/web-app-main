import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";
import DataTable from "@/components/tables/Datatable";

function Economics() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("1 Month");
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Line chart
  const axisColor = isDark ? "#fff" : "#000";
  const gridColor = isDark ? "#444" : "#ccc";
  // Pie chart
  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const netIncomeData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const piechartData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const yieldData = {
    "1 Day": [
      { crop: "Cotton", yield: "25 MT", change: "5%", color: "text-green-500" },
      { crop: "Oats", yield: "15 MT", change: "-2%", color: "text-red-500" },
      { crop: "Wheat", yield: "8 MT", change: "10%", color: "text-green-500" },
      { crop: "Hemp", yield: "42 MT", change: "3%", color: "text-green-500" },
    ],
    "5 Day": [
      { crop: "Cotton", yield: "28 MT", change: "8%", color: "text-green-500" },
      { crop: "Oats", yield: "12 MT", change: "-5%", color: "text-red-500" },
      { crop: "Wheat", yield: "10 MT", change: "12%", color: "text-green-500" },
      { crop: "Hemp", yield: "40 MT", change: "6%", color: "text-green-500" },
    ],
    "1 Month": [
      {
        crop: "Cotton",
        yield: "25 MT",
        change: "15%",
        color: "text-green-500",
      },
      { crop: "Oats", yield: "15 MT", change: "-14%", color: "text-red-500" },
      { crop: "Wheat", yield: "8 MT", change: "22%", color: "text-green-500" },
      { crop: "Hemp", yield: "42 MT", change: "12%", color: "text-green-500" },
    ],
    "1 Year": [
      {
        crop: "Cotton",
        yield: "30 MT",
        change: "25%",
        color: "text-green-500",
      },
      { crop: "Oats", yield: "10 MT", change: "-20%", color: "text-red-500" },
      { crop: "Wheat", yield: "15 MT", change: "35%", color: "text-green-500" },
      { crop: "Hemp", yield: "38 MT", change: "18%", color: "text-green-500" },
    ],
  };

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(0) + "k";
    return num;
  };

  const ArrowDot = ({ cx, cy, index, data, dataKey, stroke }) => {
    const dataLength = data.length;
    if (index !== dataLength - 1) return null; // show only at last point
    const prev = data[dataLength - 2];
    const curr = data[dataLength - 1];
    // slope angle in radians → degrees
    const dx = 1; // relative x step (positions are spaced evenly on chart)
    const dy = curr[dataKey] - prev[dataKey];
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    const size = 10;

    return (
      <polygon
        points={`${cx},${cy - size / 2} ${cx + size},${cy} ${cx},${
          cy + size / 2
        }`}
        fill={stroke}
        stroke={stroke}
        transform={`rotate(${angle}, ${cx}, ${cy}) translate(-5, -3)`}
      />
    );
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-5 pt-4 items-stretch">
          <div className="col-span-12 border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-center space-y-4 ">
            <DataTable />
          </div>
          <div className="md:col-span-6 col-span-12">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-center space-y-4">
              {/* Net Income */}
              <ResponsiveContainer
                width="100%"
                height={200}
                key={isDark ? "dark" : "light"}
              >
                <LineChart
                  data={netIncomeData}
                  margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                >
                  <text
                    x="50%"
                    y={20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fill: axisColor,
                    }}
                  >
                    Net Income Trends
                  </text>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke={axisColor} />
                  <YAxis stroke={axisColor} tickFormatter={formatNumber} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    }}
                    itemStyle={{
                      color: isDark ? "#f9fafb" : "#111827",
                    }}
                    labelStyle={{
                      color: isDark ? "#9ca3af" : "#374151",
                    }}
                  />
                  <Legend wrapperStyle={{ color: axisColor }} />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={isDark ? "#a78bfa" : "#8884d8"}
                    strokeWidth={2}
                    dot={(props) => (
                      <ArrowDot
                        {...props}
                        data={netIncomeData}
                        dataKey="pv"
                        stroke={isDark ? "#a78bfa" : "#8884d8"}
                      />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke={isDark ? "#34d399" : "#82ca9d"}
                    strokeWidth={2}
                    dot={(props) => (
                      <ArrowDot
                        {...props}
                        data={netIncomeData}
                        dataKey="uv"
                        stroke={isDark ? "#34d399" : "#82ca9d"}
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex flex-col md:flex-row">
                <div>
                  <div className="flex justify-end border-b border-gray-300 dark:border-gray-700">
                    {Object.keys(yieldData).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium ${
                          activeTab === tab
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                        <th className="py-2 px-3">Yield</th>
                        <th className="py-2 px-3">Qty</th>
                        <th className="py-2 px-3">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yieldData[activeTab].map((item) => (
                        <tr
                          key={item.crop}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="py-2 px-3">{item.crop}</td>
                          <td className="py-2 px-3">{item.yield}</td>
                          <td
                            className={`py-2 px-3 font-semibold ${item.color}`}
                          >
                            {item.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ResponsiveContainer
                  width="100%"
                  height={250}
                  key={`chart2-${isDark ? "dark" : "light"}`}
                >
                  <LineChart
                    data={netIncomeData}
                    margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                  >
                    <text
                      x="50%"
                      y={20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        fill: axisColor,
                      }}
                    >
                      Another Trend
                    </text>
                    <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={axisColor} />
                    <YAxis stroke={axisColor} tickFormatter={formatNumber} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#fff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                      }}
                      itemStyle={{
                        color: isDark ? "#f9fafb" : "#111827",
                      }}
                      labelStyle={{
                        color: isDark ? "#9ca3af" : "#374151",
                      }}
                    />
                    <Legend wrapperStyle={{ color: axisColor }} />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={isDark ? "#a78bfa" : "#8884d8"}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={isDark ? "#34d399" : "#82ca9d"}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="amt"
                      stroke={isDark ? "#cf293a" : "#cf4250"}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Revenues Card */}
          <div className="md:col-span-3 col-span-6">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-between">
              <ul className="space-y-6 text-sm">
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Revenues</span>{" "}
                  <span className="text-green-500">$856,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Cotton</span>{" "}
                  <span className="text-green-500">$236,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Hemp</span>{" "}
                  <span className="text-green-500">$301,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Oats</span>{" "}
                  <span className="text-green-500">$256,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Other</span>{" "}
                  <span className="text-green-500">$56,543</span>
                </li>
              </ul>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={piechartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {piechartData.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#fff",
                          borderColor: isDark ? "#374151" : "#e5e7eb",
                        }}
                        itemStyle={{
                          color: isDark ? "#f9fafb" : "#111827",
                        }}
                        labelStyle={{
                          color: isDark ? "#9ca3af" : "#374151",
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Costs Card */}
          <div className="md:col-span-3 col-span-6">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-between">
              <ul className="space-y-6 text-sm">
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Costs</span>{" "}
                  <span className="text-red-500">$560,324</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Seed</span>{" "}
                  <span className="text-red-500">$560,324</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Fertilizer</span>{" "}
                  <span className="text-red-500">$560,324</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Maintenance</span>{" "}
                  <span className="text-gray-500">—</span>
                </li>
              </ul>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={piechartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {piechartData.map((entry, index) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#fff",
                          borderColor: isDark ? "#374151" : "#e5e7eb",
                        }}
                        itemStyle={{
                          color: isDark ? "#f9fafb" : "#111827",
                        }}
                        labelStyle={{
                          color: isDark ? "#9ca3af" : "#374151",
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-5 pt-4 items-stretch">
          <div className="md:col-span-8 col-span-12">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-center space-y-4">
              <ResponsiveContainer
                width="100%"
                height={200}
                key={isDark ? "dark" : "light"}
              >
                <LineChart
                  data={netIncomeData}
                  margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                >
                  <text
                    x="50%"
                    y={20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fill: axisColor,
                    }}
                  >
                    Net Income Trends
                  </text>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke={axisColor} />
                  <YAxis stroke={axisColor} tickFormatter={formatNumber} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                    }}
                    itemStyle={{
                      color: isDark ? "#f9fafb" : "#111827",
                    }}
                    labelStyle={{
                      color: isDark ? "#9ca3af" : "#374151",
                    }}
                  />
                  <Legend wrapperStyle={{ color: axisColor }} />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={isDark ? "#a78bfa" : "#8884d8"}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke={isDark ? "#34d399" : "#82ca9d"}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-col md:flex-row h-full">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    width={500}
                    height={300}
                    data={netIncomeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={axisColor} />
                    <YAxis stroke={axisColor} tickFormatter={formatNumber} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#fff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                      }}
                      itemStyle={{
                        color: isDark ? "#f9fafb" : "#111827",
                      }}
                      labelStyle={{
                        color: isDark ? "#9ca3af" : "#374151",
                      }}
                    />
                    <Legend wrapperStyle={{ color: axisColor }} />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={netIncomeData}
                    margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={axisColor} />
                    <YAxis stroke={axisColor} tickFormatter={formatNumber} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#fff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                      }}
                      itemStyle={{
                        color: isDark ? "#f9fafb" : "#111827",
                      }}
                      labelStyle={{
                        color: isDark ? "#9ca3af" : "#374151",
                      }}
                    />
                    <Legend wrapperStyle={{ color: axisColor }} />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={isDark ? "#a78bfa" : "#8884d8"}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={isDark ? "#34d399" : "#82ca9d"}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12">
            <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 h-full flex flex-col justify-between">
              <ul className="space-y-6 text-sm">
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Revenues</span>{" "}
                  <span className="text-green-500">$856,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Cotton</span>{" "}
                  <span className="text-green-500">$236,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Hemp</span>{" "}
                  <span className="text-green-500">$301,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Oats</span>{" "}
                  <span className="text-green-500">$256,543</span>
                </li>
                <li className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Other</span>{" "}
                  <span className="text-green-500">$56,543</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Economics;
