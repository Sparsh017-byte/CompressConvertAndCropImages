import React, { useState } from "react";

const faqs = [
  {
    question: "🔄 What is image format conversion?",
    answer:
      "Image format conversion is the process of changing an image from one file type (such as JPG, PNG, or WebP) to another. This helps improve compatibility, reduce file size, or adapt images for specific platforms and applications without losing important visual details.",
  },
  {
    question: "📂 Which image formats can I convert between?",
    answer:
      "You can convert between popular formats such as JPG ,JPEG , PNG, WebP and AVIF. JPG is great for photos, PNG supports transparency, WebP and AVIF is optimized for the web. Each format has its unique use case and benefits.",
  },
  {
    question: "⚡ Will converting an image affect its quality?",
    answer:
      "Converting an image usually keeps most of the original quality. However, converting to lossy formats like JPG may slightly reduce details. On the other hand, converting to lossless formats like PNG or WebP maintains better clarity, making them ideal when preserving image quality is important.",
  },
  {
    question: "🌐 Why should I convert images to WebP?",
    answer:
      "WebP is a modern format developed by Google that offers smaller file sizes while maintaining high quality. Converting images to WebP helps websites load faster, reduces bandwidth costs, and improves SEO rankings. It is widely supported by modern browsers and is ideal for web optimization.",
  },
  {
    question: "🔒 Is it safe to convert images online?",
    answer:
      "Yes, converting images online is safe if you use trusted platforms. Our tool ensures secure processing and does not share or store your images permanently. All conversions happen quickly and securely, protecting your privacy while delivering fast, high-quality results for all supported formats.",
  },
];

export default function ConvertFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="accordion-open">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-700 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3 cursor-pointer"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-body-${index}`}
            >
              <span className="flex items-center">{faq.question}</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 transform transition-transform ${
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
              id={`faq-body-${index}`}
              className="p-5 border border-b-0 border-gray-200 text-gray-600"
            >
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
