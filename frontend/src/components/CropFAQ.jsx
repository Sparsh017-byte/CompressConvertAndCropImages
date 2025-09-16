import React, { useState } from "react";

const faqs = [
  {
    question: "✂️ What does image cropping mean?",
    answer:
      "Image cropping is the process of trimming unwanted outer areas of an image. It allows you to focus on the most important part of the picture, adjust aspect ratios, or remove unnecessary background elements while keeping the overall image quality intact for better presentation.",
  },
  {
    question: "📏 Can I crop images to custom dimensions?",
    answer:
      "Yes, you can crop images to any custom width and height. This allows full flexibility for banners, profile pictures, or specific design needs. Custom cropping ensures your images perfectly match the required resolution or fit into layouts where exact measurements are necessary.",
  },
  {
    question: "🖼️ Will cropping reduce my image quality?",
    answer:
      "Cropping does not reduce the quality of the remaining image; it only removes parts of the image you don’t need. However, since you are reducing the total resolution, the final image might have smaller dimensions, which can affect quality if enlarged significantly afterward.",
  },
  {
    question: "📂 Which file types can I crop?",
    answer:
      "You can crop common file types like JPG, PNG, and WebP without losing visual clarity. Our crop tool works directly in your browser and ensures that the final image is saved in the same format as the original, or you can choose another format if preferred.",
  },
  {
    question: "🔒 Is it safe to crop images online?",
    answer:
      "Yes, cropping images online is safe with trusted platforms. Our tool processes your images securely and does not permanently store or share them. Once the cropping is done, you can immediately download your image, ensuring full privacy and complete control over your files.",
  },
];

export default function CropFAQ() {
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
