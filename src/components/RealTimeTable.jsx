import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const RealTimeTable = () => {
  const [stocks, setStocks] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStocks = async () => {
      const { data } = await supabase.from("stocks").select("*").order("change", { ascending: false }).limit(10);
      setStocks(data);
    };

    const subscribe = supabase
      .channel('any')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stocks' }, payload => {
        setStocks(prev =>
          prev.map(stock => (stock.id === payload.new.id ? payload.new : stock))
        );
      })
      .subscribe();

    fetchStocks().finally(() => setLoading(false));

    // Cleanup function removed as supabase.removeSubscription is not available in the current version.
  }, []);

  if (loading) {
    return <div>Loading stocks...</div>;
  }

  if (!stocks || stocks.length === 0) {
    return <div>No stocks found.</div>;
  }

  // Color theme for calmness (light mode)
  const lightTheme = {
    background: "#f8f9fa", // Soft background
    tableHeader: "#e9ecef", // Light header
    borderColor: "#ced4da", // Subtle border
    textColor: "#343a40", // Dark text for contrast
    positiveChange: "#28a745", // Green for positive change
    negativeChange: "#dc3545", // Red for negative change
  };

  // Color theme for calmness (dark mode)
  const darkTheme = {
    background: "#343a40", // Dark background
    tableHeader: "#495057", // Darker header
    borderColor: "#6c757d", // Lighter border for contrast
    textColor: "#f8f9fa", // Light text for contrast
    positiveChange: "#28a745", // Green for positive change
    negativeChange: "#dc3545", // Red for negative change
  };

  // Select the appropriate theme based on darkMode state
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.textColor }}>
    <button onClick={() => setDarkMode(!darkMode)}>
      Toggle {darkMode ? "Light" : "Dark"} Mode
    </button>
    <table className="w-full border-collapse border" style={{ borderColor: theme.borderColor }}>
      <thead>
        <tr style={{ backgroundColor: theme.tableHeader }}>
          <th className="border p-2" style={{ borderColor: theme.borderColor }}>Stock</th>
          <th className="border p-2" style={{ borderColor: theme.borderColor }}>Price</th>
          <th className="border p-2" style={{ borderColor: theme.borderColor }}>Change (%)</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (
          <tr key={stock.id}>
            <td className="border p-2" style={{ borderColor: theme.borderColor }}>{stock.name}</td>
            <td className="border p-2" style={{ borderColor: theme.borderColor }}>{stock.price}</td>
            <td
              className={`border p-2 ${
                stock.change > 0 ? `text-${theme.positiveChange}` : `text-${theme.negativeChange}`
              }`}
              style={{ borderColor: theme.borderColor }}
            >
              {stock.change.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};
