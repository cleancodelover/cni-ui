import React from "react";

function Footer() {
  return (
    <footer className="sticky bottom-0 bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Previous
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Next
        </button>
      </div>
    </footer>
  );
}

export default Footer;
