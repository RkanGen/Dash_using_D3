import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { OverviewStats } from "./components/OverviewStats";
import { StockPriceChart } from "./components/StockPriceChart";
import { VolumeBarChart } from "./components/VolumeBarChart";
import { SectorPieChart } from "./components/SectorPieChart";
import { RealTimeTable } from "./components/RealTimeTable";

const mockStats = [
  { label: "Total Market Cap", value: "$2.3 Trillion" },
  { label: "24h Volume", value: "$120 Billion" },
  { label: "Active Stocks", value: "432" }
];

const mockLineData = [
  { date: "2024-12-20", price: 175 },
  { date: "2024-12-21", price: 178 },
  { date: "2024-12-22", price: 180 }
];

const mockBarData = [
  { date: "2024-12-20", volume: 500000 },
  { date: "2024-12-21", volume: 650000 },
  { date: "2024-12-22", volume: 700000 }
];

const mockPieData = [
  { label: "Tech", value: 40 },
  { label: "Finance", value: 30 },
  { label: "Health", value: 20 },
  { label: "Energy", value: 10 }
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <OverviewStats data={mockStats} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 col-span-1 md:col-span-2">
            <StockPriceChart data={mockLineData} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <VolumeBarChart data={mockBarData} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <SectorPieChart data={mockPieData} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3">
            <RealTimeTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}