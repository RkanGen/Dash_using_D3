import React from "react";

export const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p>© 2024 Stock Market Dashboard. All rights reserved.</p>
    <div className="space-x-4">
      <a href="https://supabase.io" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Supabase
      </a>
      <a href="https://d3js.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
        D3.js
      </a>
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Vite.js
      </a>
    </div>
  </footer>
);
