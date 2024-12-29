import React from "react";

export const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Stock Market Dashboard</h1>
      <nav className="hidden md:flex space-x-6"> 
        <a href="/" className="hover:text-gray-300 transition duration-300">
          Home
        </a>
        <a href="/insights" className="hover:text-gray-300 transition duration-300">
          Insights
        </a>
        <a href="/analytics" className="hover:text-gray-300 transition duration-300">
          Analytics
        </a>
        <a href="/settings" className="hover:text-gray-300 transition duration-300">
          Settings
        </a>
      </nav>
      {/* Mobile Menu (Hidden by default, visible on smaller screens) */}
      <div className="md:hidden">
        {/* Add a mobile menu icon or button here */}
      </div>
    </header>
  );
};
