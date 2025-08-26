// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#abe2ee] py-4 mt-10 text-center">
      <p className="text-sm">
        © CCCImages | Made by <span className="font-semibold">Sparsh Gumasta</span>
      </p>
      <p className="text-sm">
        <a
          href="https://www.linkedin.com/in/sparsh-gumasta-438543307/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black-400 hover:underline"
        >
          Connect on LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
