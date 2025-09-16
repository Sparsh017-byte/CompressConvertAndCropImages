import React, { useState } from "react";

const faqs = [
  {
    question: "What is image compression?",
    answer:
      "Image compression reduces the file size of an image by removing unnecessary data while keeping the visual quality as high as possible.",
  },
  {
    question: "Will compressing my image reduce its quality?",
    answer:
      "Not necessarily. With lossless compression, the quality remains the same. With lossy compression, there may be a slight reduction, but it’s usually not noticeable to the human eye.",
  },
  {
    question: "Which image formats support compression?",
    answer:
      "Common formats like JPG, PNG, and WebP support compression. JPG is best for photos, PNG for graphics with transparency, and WebP for modern web optimization.",
  },
  {
    question: "Why should I compress my images?",
    answer:
      "Compressed images load faster on websites, save storage space, and improve SEO rankings by reducing page load times.",
  },
  {
    question: "Can I choose the compression level?",
    answer:
      "Yes, you can usually adjust the compression level. Higher compression means smaller file sizes but may reduce quality.",
  },
  {
    question: "Does image compression affect transparency?",
    answer:
      "Lossless formats like PNG preserve transparency. JPEG does not support transparency, but WebP does.",
  },
  {
    question: "Is online image compression safe?",
    answer:
      "Yes, as long as you use a trusted platform. Many tools don’t store your files permanently and delete them after processing.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes, many tools support bulk or batch compression so you can process multiple images in one go.",
  },
  {
    question: "Does compressing images help with SEO?",
    answer:
      "Absolutely. Smaller images load faster, which improves user experience and boosts search engine rankings.",
  },
  {
    question: "What’s the difference between lossless and lossy compression?",
    answer:
      "Lossless compression reduces file size without losing any detail, while lossy compression reduces size more aggressively by discarding some image data.",
  },
];

function CompressFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions about Image Compression
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span className="text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompressFAQ;

