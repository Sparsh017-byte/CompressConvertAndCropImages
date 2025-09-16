import React, { useState } from "react";

function CompressFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "📷 What is image compression?",
      answer:
        "Image compression is the process of reducing the file size of an image by removing or encoding redundant data. It helps save storage space, reduces bandwidth usage, and speeds up image loading on websites and apps while maintaining an acceptable level of visual quality for the viewer.",
    },
    {
      question: "⚡ Will compressing my image reduce its quality?",
      answer:
        "Compressing an image may or may not affect its quality depending on the method used. Lossless compression preserves the original quality without any visible changes, while lossy compression slightly reduces details to achieve smaller file sizes. Typically, the quality loss is minimal and barely noticeable to most users.",
    },
    {
      question: "📂 Which image formats support compression?",
      answer:
        "Common image formats like JPG, PNG, and WebP support compression. JPG works best for photographs, PNG is ideal for graphics with text or transparency, and WebP combines high compression efficiency with excellent quality, making it the preferred choice for modern websites aiming for speed and performance optimization.",
    },
    {
      question: "🌐 Why should I compress images for websites?",
      answer:
        "Compressing images is essential for websites because it reduces page load times, improves user experience, and saves server bandwidth. Faster websites also rank higher in search engines, which boosts SEO. Optimized images ensure that visitors on both desktop and mobile devices can access content quickly without interruptions.",
    },
    {
      question: "🔒 Is it safe to compress images online?",
      answer:
        "Yes, compressing images online is safe if you use a reliable platform. Reputable tools like CCCImages ensure secure processing, temporary storage, and quick deletion of uploaded files. This protects your privacy while providing efficient compression. Always choose trusted services that guarantee data security and don’t share your files.",
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
              className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 border ${index === faqs.length - 1 ? "border-gray-200" : "border-b-0 border-gray-200"
                } focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3 cursor-pointer`}
              aria-expanded={openIndex === index}
              aria-controls={`accordion-open-body-${index}`}
            >
              <span className="flex items-center">{faq.question}</span>
              <svg
                className={`w-3 h-3 shrink-0 transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
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

