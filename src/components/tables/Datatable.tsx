import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
  LineChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { X } from "lucide-react";

// Example dataset
const initialData = [
  {
    id: 1,
    symbol: "ES=F",
    name: "E-Mini S&P 500 Sep 25",
    price: 6588.5,
    change: -4.0,
    changePct: -0.06,
    volume: "1.482M",
    time: "4:21PM EDT",
    history: [
      0, 25, -10, 15, -20, 30, -15, 20, -5, 40, -30, 10, 5, -15, 25, -10, 20,
      -5, 30, -20,
    ],
  },
  {
    id: 2,
    symbol: "NQ=F",
    name: "Nasdaq 100 Sep 25",
    price: 24116.25,
    change: +98.5,
    changePct: +0.41,
    volume: "415,536",
    time: "4:21PM EDT",
    history: [
      0, -40, 60, 30, -20, 70, 100, -50, 40, 80, -30, 90, 120, -40, 60, 100,
      -20, 80, 140, 100,
    ],
  },
  {
    id: 3,
    symbol: "GC=F",
    name: "Gold Dec 25",
    price: 3680.7,
    change: +7.1,
    changePct: +0.19,
    volume: "145,781",
    time: "4:21PM EDT",
    history: [
      0, 15, -10, 25, -15, 20, 30, -20, 10, 15, -5, 20, 25, -15, 35, 10, -20,
      30, 40, -10,
    ],
  },
  {
    id: 4,
    symbol: "SI=F",
    name: "Silver Dec 25",
    price: 42.65,
    change: +0.5,
    changePct: +1.19,
    volume: "69,620",
    time: "4:21PM EDT",
    history: [
      0, -5, 10, 15, -20, 25, -10, 30, -15, 20, 10, -5, 15, 25, -20, 30, -10,
      40, -5, 35,
    ],
  },
  {
    id: 5,
    symbol: "CL=F",
    name: "Crude Oil Dec 25",
    price: 78.12,
    change: -1.25,
    changePct: -1.57,
    volume: "850,120",
    time: "4:21PM EDT",
    history: [
      0, 10, -20, 15, -30, 25, -10, 20, -40, 15, 25, -20, 30, -15, 20, 35, -25,
      40, -10, 20,
    ],
  },
  {
    id: 6,
    symbol: "BTC=F",
    name: "Bitcoin Futures Dec 25",
    price: 65420.55,
    change: +540,
    changePct: +0.84,
    volume: "32,450",
    time: "4:21PM EDT",
    history: [
      0, 200, -150, 300, -250, 400, -200, 350, -100, 450, -300, 500, -150, 600,
      -200, 700, -250, 650, -100, 800,
    ],
  },
  {
    id: 7,
    symbol: "ETH=F",
    name: "Ethereum Futures Dec 25",
    price: 3450.25,
    change: -80,
    changePct: -2.27,
    volume: "18,320",
    time: "4:21PM EDT",
    history: [
      0, -50, 100, -80, 150, -120, 200, -100, 180, -50, 220, -70, 250, -150,
      200, -80, 260, -50, 300, -100,
    ],
  },
  {
    id: 8,
    symbol: "ZN=F",
    name: "10-Year T-Note Futures",
    price: 113.25,
    change: -0.41,
    changePct: -0.36,
    volume: "1.291M",
    time: "4:21PM EDT",
    history: [
      0, -5, 10, -15, 20, -10, 15, -20, 25, -5, 30, -15, 20, -10, 35, -5, 40,
      -15, 30, -20,
    ],
  },
  {
    id: 9,
    symbol: "ZB=F",
    name: "U.S. Treasury Bond Futures",
    price: 117.31,
    change: -0.66,
    changePct: -0.56,
    volume: "299,318",
    time: "4:21PM EDT",
    history: [
      0, 10, -20, 15, -30, 25, -15, 20, -10, 15, -5, 25, -20, 30, -15, 35, -10,
      40, -25, 30,
    ],
  },
  {
    id: 10,
    symbol: "RTY=F",
    name: "E-Mini Russell 2000 Index",
    price: 2399.1,
    change: -24,
    changePct: -0.99,
    volume: "212,633",
    time: "4:21PM EDT",
    history: [
      0, -15, 20, -30, 25, -20, 15, -40, 20, -25, 30, -10, 35, -20, 40, -15, 30,
      -25, 50, -20,
    ],
  },
  {
    id: 11,
    symbol: "MGC=F",
    name: "Micro Gold Futures",
    price: 3680.6,
    change: +7,
    changePct: +0.19,
    volume: "185,498",
    time: "4:21PM EDT",
    history: [
      0, 20, -10, 25, -15, 30, -5, 35, -20, 40, -15, 30, -10, 45, -5, 50, -15,
      40, -10, 55,
    ],
  },
  {
    id: 12,
    symbol: "SIL=F",
    name: "Micro Silver Futures",
    price: 42.66,
    change: +0.51,
    changePct: +1.21,
    volume: "29,180",
    time: "4:21PM EDT",
    history: [
      0, -5, 15, -10, 20, -15, 25, -20, 30, -25, 35, -10, 40, -20, 45, -15, 50,
      -10, 55, -5,
    ],
  },
  {
    id: 13,
    symbol: "PL=F",
    name: "Platinum Futures",
    price: 950.8,
    change: -12.5,
    changePct: -1.3,
    volume: "52,340",
    time: "4:21PM EDT",
    history: [
      0, 10, -15, 20, -25, 15, -20, 30, -10, 35, -15, 25, -20, 40, -10, 45, -15,
      30, -20, 50,
    ],
  },
  {
    id: 14,
    symbol: "PA=F",
    name: "Palladium Futures",
    price: 1420.2,
    change: +22,
    changePct: +1.57,
    volume: "18,765",
    time: "4:21PM EDT",
    history: [
      0, -30, 40, -20, 60, -10, 80, -30, 100, -20, 120, -40, 140, -20, 160, -10,
      180, -30, 200, -20,
    ],
  },
  {
    id: 15,
    symbol: "HG=F",
    name: "Copper Futures",
    price: 3.85,
    change: -0.12,
    changePct: -0.31,
    volume: "76,432",
    time: "4:21PM EDT",
    history: [
      0, 5, -10, 20, -15, 30, -25, 35, -20, 40, -30, 45, -25, 50, -35, 55, -40,
      60, -30, 65,
    ],
  },
];

// Column definitions
const allColumns = [
  { id: "symbol", label: "Symbol" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "time", label: "Market Time" },
  { id: "change", label: "Change" },
  { id: "changePct", label: "Change %" },
  { id: "volume", label: "Volume" },
  { id: "trend", label: "Trend" },
];

export default function DataTable() {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    dir: "asc" | "desc";
  } | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCols, setVisibleCols] = useState(allColumns.map((c) => c.id));
  const pageSize = 10;

  // Filter by search
  const filteredData = initialData.filter(
    (row) =>
      row.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key as keyof typeof a];
    const bVal = b[sortConfig.key as keyof typeof b];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.dir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.dir === "asc") return { key, dir: "desc" };
      return { key, dir: "asc" };
    });
  };

  // Toggle column
  const toggleColumn = (id: string) => {
    setVisibleCols((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const [isDark, setIsDark] = useState(false);
  // Line chart
  const axisColor = isDark ? "#fff" : "#000";
  const gridColor = isDark ? "#444" : "#ccc";
  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(0) + "k";
    return num;
  };
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
  return (
    <>
      <div className="w-full max-w-6xl mx-auto text-sm">
        {/* Top Bar: Column Toggle + Search */}
        <div className="flex justify-between items-center mb-2">
          {/* Column Toggle */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="px-3 py-1 border rounded bg-white dark:bg-gray-800 text-black dark:text-white text-sm">
              Columns ▾
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="bg-white dark:bg-gray-900 text-black dark:text-white p-2 rounded shadow-lg space-y-1"
              sideOffset={5}
            >
              {allColumns.map((col) => (
                <DropdownMenu.Item
                  key={col.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                  onSelect={() => toggleColumn(col.id)}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      visibleCols.includes(col.id)
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {col.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1 border rounded text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
          />
        </div>

        {/* Responsive Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-white dark:bg-gray-900 text-black dark:text-white">
              <tr>
                {allColumns.map(
                  (col) =>
                    visibleCols.includes(col.id) && (
                      <th
                        key={col.id}
                        className={`p-2 text-left whitespace-nowrap 
                  ${col.id === "name" ? "min-w-[140px]" : "min-w-[70px]"}
                `}
                        onClick={() => handleSort(col.id)}
                      >
                        {col.label}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-gray-700">
                  {allColumns.map((col) => {
                    if (!visibleCols.includes(col.id)) return null;

                    return (
                      <td
                        key={col.id}
                        className={`p-2 align-middle text-sm whitespace-nowrap 
                  ${col.id === "name" ? "min-w-[140px]" : "min-w-[70px]"}
                `}
                      >
                        {col.id === "symbol" && (
                          <span className="font-mono text-blue-400">
                            {row.symbol}
                          </span>
                        )}
                        {col.id === "name" && row.name}
                        {col.id === "price" && row.price.toLocaleString()}
                        {col.id === "time" && row.time}
                        {col.id === "change" && (
                          <span
                            className={
                              row.change >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {row.change > 0 ? "+" : ""}
                            {row.change}
                          </span>
                        )}
                        {col.id === "changePct" && (
                          <span
                            className={
                              row.changePct >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {row.changePct > 0 ? "+" : ""}
                            {row.changePct.toFixed(2)}%
                          </span>
                        )}
                        {col.id === "volume" && row.volume}

                        {col.id === "trend" && (
                          <div
                            className="w-[100px] h-[40px]"
                            onClick={() => setSelectedRow(row)}
                          >
                            <ResponsiveContainer
                              width="100%"
                              height="100%"
                              className="cursor-pointer"
                            >
                              <LineChart
                                data={row.history.map((val, i) => ({
                                  x: i,
                                  y: val,
                                }))}
                              >
                                <ReferenceLine
                                  y={0}
                                  stroke="#888"
                                  strokeDasharray="3 3"
                                />
                                <defs>
                                  {(() => {
                                    const minY = Math.min(...row.history);
                                    const maxY = Math.max(...row.history);
                                    const zeroOffset =
                                      (maxY / (maxY - minY)) * 100;
                                    return (
                                      <linearGradient
                                        id={`color-${row.id}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset={`${zeroOffset}%`}
                                          stopColor="#22c55e"
                                        />
                                        <stop
                                          offset={`${zeroOffset}%`}
                                          stopColor="#ef4444"
                                        />
                                      </linearGradient>
                                    );
                                  })()}
                                </defs>
                                <Line
                                  type="monotone"
                                  dataKey="y"
                                  stroke={`url(#color-${row.id})`}
                                  strokeWidth={2}
                                  dot={false}
                                  isAnimationActive={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleCols.length}
                    className="text-center p-4 text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-3">
          <span>
            Page {page} of {totalPages}
          </span>
          <div>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 mr-2"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Dialog.Root
        open={!!selectedRow}
        onOpenChange={() => setSelectedRow(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content
            className="fixed inset-0 m-auto bg-white dark:bg-gray-900 text-black dark:text-white 
                 p-6 rounded max-w-2xl w-full h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-bold mb-4">
                {selectedRow?.name}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button>
                  <X />
                </button>
              </Dialog.Close>
            </div>

            {/* Row details */}
            <div className="space-y-2 mb-6">
              {allColumns.map((col) => (
                <div key={col.id}>
                  <strong>{col.label}: </strong>
                  {selectedRow?.[col.id] ??
                    (col.id === "trend" ? "See graph below" : "-")}
                </div>
              ))}
            </div>

            {/* Large Chart */}
            {selectedRow && (
              <div className="w-full h-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  key={isDark ? "dark" : "light"}
                >
                  <LineChart
                    data={selectedRow.history.map((val, i) => ({
                      x: i,
                      y: val,
                    }))}
                  >
                    <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
                    <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

                    <XAxis
                      dataKey="x"
                      stroke={axisColor}
                      tick={{ fill: axisColor }}
                    />
                    <YAxis
                      stroke={axisColor}
                      tick={{ fill: axisColor }}
                      tickFormatter={formatNumber}
                    />

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

                    <defs>
                      {(() => {
                        const minY = Math.min(...selectedRow.history);
                        const maxY = Math.max(...selectedRow.history);
                        const zeroOffset = (maxY / (maxY - minY)) * 100;
                        return (
                          <linearGradient
                            id={`color-${selectedRow.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset={`${zeroOffset}%`}
                              stopColor="#22c55e"
                            />
                            <stop
                              offset={`${zeroOffset}%`}
                              stopColor="#ef4444"
                            />
                          </linearGradient>
                        );
                      })()}
                    </defs>

                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke={`url(#color-${selectedRow.id})`}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                      name={selectedRow.symbol}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
