// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        {/* Top row */}
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src="/logo.png" className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
                CCCImages
              </span>
            </a>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Resources */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <a href="https://react.dev" className="hover:underline">
                    React
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow us */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <a href="https://www.linkedin.com/company/cccimages" className="hover:underline">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://x.com/cccimages" className="hover:underline">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4">
                  <a href ="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025{" "}
            <a href="/" className="hover:underline">
              CCCImages™
            </a>
            . All Rights Reserved.
          </span>

          {/* Social icons */}
          <div className="flex justify-center space-x-5">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


