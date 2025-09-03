// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
  <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
    {/* Top row */}
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <a href="/" className="flex items-center">
          <img src="/logo.png" className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CCCImages
          </span>
        </a>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {/* Resources, Follow us, Legal */}
        {/* ... your same code here ... */}
      </div>
    </div>

    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

    {/* Bottom row */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025 <a href="/" className="hover:underline">CCCImages™</a>. All Rights Reserved.
      </span>

      {/* Social icons */}
      <div className="flex justify-center space-x-5">
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <i className="fab fa-github"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <i className="fab fa-dribbble"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;


