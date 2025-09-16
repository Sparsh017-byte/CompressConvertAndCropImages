import React from "react";

export default function CompressFAQ() {
  return (
    <div id="accordion-open" data-accordion="open" className="mt-12">
      {/* FAQ 1 */}
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">
            What is image compression?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
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
        <div className="p-5 border border-b-0 border-gray-200 bg-gray-50">
          <p className="text-gray-500">
            Image compression is the process of reducing the file size of an
            image while keeping the quality as close to the original as possible.
          </p>
        </div>
      </div>

      {/* FAQ 2 */}
      <h2 id="accordion-open-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-open-body-2"
          aria-expanded="false"
          aria-controls="accordion-open-body-2"
        >
          <span className="flex items-center">
            What is the difference between lossy and lossless compression?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
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
        <div className="p-5 border border-b-0 border-gray-200 bg-gray-50">
          <p className="text-gray-500">
            Lossy compression (e.g., JPEG) reduces file size by removing some
            data permanently, while lossless compression (e.g., PNG, WebP) keeps
            all image details intact.
          </p>
        </div>
      </div>

      {/* FAQ 3 */}
      <h2 id="accordion-open-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-open-body-3"
          aria-expanded="false"
          aria-controls="accordion-open-body-3"
        >
          <span className="flex items-center">
            Does compression reduce image quality?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
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
        <div className="p-5 border border-t-0 border-gray-200 bg-gray-50">
          <p className="text-gray-500">
            In lossy compression, there can be a slight reduction in quality, but
            it is often unnoticeable. Lossless compression does not affect image
            quality.
          </p>
        </div>
      </div>

      {/* FAQ 4 */}
      <h2 id="accordion-open-heading-4">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-open-body-4"
          aria-expanded="false"
          aria-controls="accordion-open-body-4"
        >
          <span className="flex items-center">
            Why should I compress images before uploading to a website?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
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
        id="accordion-open-body-4"
        className="hidden"
        aria-labelledby="accordion-open-heading-4"
      >
        <div className="p-5 border border-t-0 border-gray-200 bg-gray-50">
          <p className="text-gray-500">
            Compressed images load faster, improve SEO rankings, save server
            bandwidth, and enhance user experience on websites.
          </p>
        </div>
      </div>

      {/* FAQ 5 */}
      <h2 id="accordion-open-heading-5">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
          data-accordion-target="#accordion-open-body-5"
          aria-expanded="false"
          aria-controls="accordion-open-body-5"
        >
          <span className="flex items-center">
            Which format is best for compressed images?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
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
        id="accordion-open-body-5"
        className="hidden"
        aria-labelledby="accordion-open-heading-5"
      >
        <div className="p-5 border border-t-0 border-gray-200 bg-gray-50">
          <p className="text-gray-500">
            JPEG is great for photos (lossy), PNG is best for images with
            transparency, and WebP offers the best balance of quality and size.
          </p>
        </div>
      </div>
    </div>
  );
}
