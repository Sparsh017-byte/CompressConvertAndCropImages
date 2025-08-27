// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Ads from './Ads';

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      {/* Header with Single Image */}
      <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src="/images/header2.png" // 👈 choose your preferred header image here
          alt="header"
          className="w-full h-full object-cover"
        />
        {/* Overlay with tagline */}
        <div className="absolute inset-0 bg-opacity-10 flex items-center justify-center">
          <h1 className="text-black text-4xl md:text-6xl font-bold text-center drop-shadow-1g">
            Compress · Convert · Crop Images
          </h1>
        </div>
      </div>
      <Ads adSlot="4737260621" test={true} />
      {/* Sections */}
      <div className="max-w-6xl mx-auto py-16 space-y-16 px-4">
        {/* Compress Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/images/compress.png"
            alt="compress"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4"><Link to='/compress' className="hover:text-[#008fb3] transition-colors duration-100">Compress</Link></h2>
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
          <img
            src="/images/convert.png"
            alt="convert"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Crop Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/images/crop.png"
            alt="crop"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4"><Link to='/crop' className="hover:text-[#008fb3] transition-colors duration-100" >Crop</Link></h2>
            <p className="text-lg text-gray-600">
              Crop images to focus on what matters most. Customize aspect ratios
              for social media, presentations, or personal use.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
