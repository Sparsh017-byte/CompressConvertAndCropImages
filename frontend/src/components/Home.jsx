// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Ads from './Ads';

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      {/* Header with Single Image */}
      <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <picture>
          <source srcSet="/images/header2.avif" type="image/avif" />
          
          <img
            src="/images/header2.png" // fallback
            alt="header"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Overlay with tagline */}
        <div className="absolute inset-0 bg-opacity-10 flex items-center justify-center">
          <h1 className="text-black text-4xl md:text-6xl font-bold text-center drop-shadow-1g">
            Compress · Convert · Crop Images
          </h1>
        </div>
      </div>

      

      {/* Sections */}
      <div className="max-w-6xl mx-auto py-16 space-y-16 px-4">
        {/* Compress Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <picture>
            <source srcSet="/images/compress.avif" type="image/avif" />
            
            <img
              src="/images/compress.png"
              alt="compress"
              className="rounded-2xl shadow-lg"
            />
          </picture>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <Link to="/compress" className="hover:text-[#008fb3] transition-colors duration-100">Compress</Link>
            </h2>
            <p className="text-lg text-gray-600">
              Reduce file size without losing quality. Our smart compression
              keeps your images sharp while making them lightweight for the web.
            </p>
          </div>
        </div>

        {/* Convert Section */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <Link to="/convert" className="hover:text-[#008fb3] transition-colors duration-100">Convert</Link>
            </h2>
            <p className="text-lg text-gray-600">
              Easily convert between formats like JPEG, PNG, WebP, and AVIF.
              Perfect for adapting images to different platforms and needs.
            </p>
          </div>
          <picture>
            <source srcSet="/images/convert.avif" type="image/avif" />
            
            <img
              src="/images/convert.png"
              alt="convert"
              className="rounded-2xl shadow-lg"
            />
          </picture>
        </div>

        {/* Crop Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <picture>
            <source srcSet="/images/crop.avif" type="image/avif" />
            
            <img
              src="/images/crop.png"
              alt="crop"
              className="rounded-2xl shadow-lg"
            />
          </picture>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <Link to="/crop" className="hover:text-[#008fb3] transition-colors duration-100">Crop</Link>
            </h2>
            <p className="text-lg text-gray-600">
              Crop images to focus on what matters most. Customize aspect ratios
              for social media, presentations, or personal use.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to <strong>CCC Images</strong> — your free online tool to 
            <strong> compress images, convert formats, and crop pictures </strong> 
            with ease. Our mission is to make image optimization simple, fast, 
            and reliable, so your photos are always ready for websites, blogs, 
            and social media.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you need to reduce image size for faster website loading, 
            change file types for compatibility, or crop photos to the perfect 
            dimensions, <strong>CCCImages.online</strong> is here to help. 
            We focus on speed, privacy, and quality — ensuring your images stay 
            sharp while saving valuable storage and bandwidth.
          </p>
          <p className="text-lg text-gray-700">
            For support or queries, reach us at:{" "}
            <a href="mailto:support@cccimages.online" className="text-[#008fb3] underline">
              support@cccimages.online
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
