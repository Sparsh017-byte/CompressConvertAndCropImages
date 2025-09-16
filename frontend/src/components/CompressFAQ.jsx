import React from "react";

function CompressFAQ() {
  return (
    <div id="accordion-open" data-accordion="open">
      {/* FAQ 1 */}
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 cursor-pointer"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="false"
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">
            📷 What is image compression?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-open-body-1"
        className="hidden"
        aria-labelledby="accordion-open-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200">
          <p className="mb-2 text-gray-600">
            Image compression reduces the file size of an image by removing
            unnecessary data while keeping the visual quality as high as
            possible.
          </p>
        </div>
      </div>

      {/* FAQ 2 */}
      <h2 id="accordion-open-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 cursor-pointer"
          data-accordion-target="#accordion-open-body-2"
          aria-expanded="false"
          aria-controls="accordion-open-body-2"
        >
          <span className="flex items-center">
            ⚡ Will compressing my image reduce its quality?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-open-body-2"
        className="hidden"
        aria-labelledby="accordion-open-heading-2"
      >
        <div className="p-5 border border-b-0 border-gray-200">
          <p className="mb-2 text-gray-600">
            With lossless compression, the quality remains the same. With lossy
            compression, there may be a slight reduction, but it’s usually not
            noticeable to the human eye.
          </p>
        </div>
      </div>

      {/* FAQ 3 */}
      <h2 id="accordion-open-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 cursor-pointer"
          data-accordion-target="#accordion-open-body-3"
          aria-expanded="false"
          aria-controls="accordion-open-body-3"
        >
          <span className="flex items-center">
            📂 Which image formats support compression?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-open-body-3"
        className="hidden"
        aria-labelledby="accordion-open-heading-3"
      >
        <div className="p-5 border border-gray-200">
          <p className="mb-2 text-gray-600">
            JPG, PNG, and WebP support compression. JPG is best for photos, PNG
            for graphics with transparency, and WebP for modern web optimization.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompressFAQ;
