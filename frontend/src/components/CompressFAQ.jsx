import React, { useState } from "react";

function CompressFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "📷 What is image compression?",
      answer:
        "Image compression reduces the file size of an image by removing unnecessary data while keeping the visual quality as high as possible.",
    },
    {
      question: "⚡ Will compressing my image reduce its quality?",
      answer:
        "With lossless compression, the quality remains unchanged. With lossy compression, there may be a slight reduction, but it’s usually not noticeable to the human eye.",
    },
    {
      question: "📂 Which image formats support compression?",
      answer:
        "JPG, PNG, and WebP support compression. JPG is best for photos, PNG for graphics with transparency, and WebP for modern web optimization.",
    },
    {
      question: "🌐 Why should I compress images for websites?",
      answer:
        "Compressed images load faster, improve SEO rankings, reduce bandwidth usage, and provide a better user experience on all devices.",
    },
    {
      question: "🔒 Is it safe to compress images online?",
      answer:
        "Yes, as long as you use trusted platforms. CCCImages processes files securely and does not share your images with third parties.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="accordion-open">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2 id={`accordion-open-heading-${index}`}>
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 border ${
                index === faqs.length - 1 ? "border-gray-200" : "border-b-0 border-gray-200"
              } focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 cursor-pointer`}
              aria-expanded={openIndex === index}
              aria-controls={`accordion-open-body-${index}`}
            >
              <span className="flex items-center">{faq.question}</span>
              <svg
                className={`w-3 h-3 shrink-0 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
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
          {openIndex === index && (
            <div
              id={`accordion-open-body-${index}`}
              aria-labelledby={`accordion-open-heading-${index}`}
            >
              <div className="p-5 border border-gray-200 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CompressFAQ;

