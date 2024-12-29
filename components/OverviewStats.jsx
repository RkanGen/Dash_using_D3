import React from "react";

export const OverviewStats = ({ data }) => (
  <div className="grid grid-cols-3 gap-4 p-4">
    {data.map((stat, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold">{stat.label}</h3>
        <p className="text-2xl font-bold">{stat.value}</p>
      </div>
    ))}
  </div>
);
